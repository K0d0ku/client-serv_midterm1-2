import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";

export default function SearchResultExpand() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, id } = location.state || {};

  const [user, setUser] = useState(null);
  const [artist, setArtist] = useState(null);
  const [artistMusic, setArtistMusic] = useState([]);
  const [music, setMusic] = useState(null);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token || !type || !id) {
      navigate("/midterm2");
      return;
    }

    try {
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: userData.sub, role: userData.role });
    } catch {
      localStorage.removeItem("jwtToken");
      navigate("/midterm2/login");
      return;
    }

    if (type === "artist") {
      Promise.all([
        fetch(`http://localhost:8080/music/artist-data/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`http://localhost:8080/music/artist/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ])
        .then(async ([artistRes, musicRes]) => {
          const artistData = await artistRes.json();
          const musicData = await musicRes.json();
          setArtist(artistData);
          setArtistMusic(musicData);
        })
        .finally(() => setLoading(false));
    }

    if (type === "music") {
      fetch(`http://localhost:8080/music/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setMusic(data))
        .finally(() => setLoading(false));
    }

    if (type === "genre") {
      fetch(`http://localhost:8080/genres/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setGenre(data))
        .finally(() => setLoading(false));
    }

  }, [type, id, navigate]);

  if (loading) {
    return (
      <div>
        <Header user={user} />
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header user={user} />
      <main style={{ padding: "20px", textAlign: "center" }}>

        {type === "artist" && artist && (
          <>
            <h2>Artist Profile</h2>
            <p><b>ID:</b> {artist.ID}</p>
            <p><b>Name:</b> {artist.Name}</p>
            <p><b>Role:</b> {artist.Role}</p>
            <p><b>Created At:</b> {new Date(artist.CreatedAt).toLocaleDateString()}</p>

            <h3>Uploaded Music</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
              {artistMusic.map(m => (
                <div key={m.ID} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
                  <p><b>Title:</b> {m.Title}</p>
                  <p>{m.Description}</p>
                  <p><b>Genre:</b> {m.Genre?.Name}</p>
                  <p><b>Created:</b> {new Date(m.CreatedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {type === "music" && music && (
          <>
            <h2>Music Info</h2>
            <p><b>ID:</b> {music.ID}</p>
            <p><b>Title:</b> {music.Title}</p>
            <p><b>Description:</b> {music.Description}</p>
            <p><b>Genre:</b> {music.Genre?.Name}</p>
            <p><b>Artist:</b> {music.Artist?.Name}</p>
            <p><b>Created:</b> {new Date(music.CreatedAt).toLocaleDateString()}</p>
          </>
        )}

        {type === "genre" && genre && (
          <>
            <h2>Genre Info</h2>
            <p><b>ID:</b> {genre.ID}</p>
            <p><b>Name:</b> {genre.Name}</p>
            <p>{genre.Description}</p>
          </>
        )}

      </main>
      <Footer />
    </div>
  );
}
