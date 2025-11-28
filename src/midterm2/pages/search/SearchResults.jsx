import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state || {};

  const [user, setUser] = useState(null);
  const [results, setResults] = useState({
    artists: [],
    music: [],
    genres: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/midterm2/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.sub, role: payload.role });
    } catch {
      console.error("Invalid token");
      localStorage.removeItem("jwtToken");
      navigate("/midterm2/login");
      return;
    }

    if (!query) {
      setError("No search query provided.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/music/search?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then(data => {
        const artists = [];
        const music = [];
        const genres = [];

        data.forEach(item => {
          if (item.Artist && !artists.find(a => a.ID === item.Artist.ID)) {
            artists.push({
              ID: item.Artist.ID,
              Name: item.Artist.Name,
              Role: item.Artist.Role,
              CreatedAt: item.Artist.CreatedAt
            });
          }

          if (item.Genre && !genres.find(g => g.ID === item.Genre.ID)) {
            genres.push({
              ID: item.Genre.ID,
              Name: item.Genre.Name,
              Description: item.Genre.Description
            });
          }

          music.push({
            ID: item.ID,
            Title: item.Title,
            Description: item.Description,
            Genre: item.Genre ? item.Genre.Name : "Unknown"
          });
        });

        setResults({ artists, music, genres });
      })
      .catch(err => {
        console.error("Search error:", err);
        setError("Error fetching search results");
      })
      .finally(() => setLoading(false));
  }, [query, navigate]);

  if (loading) {
    return (
      <div>
        <Header user={user} />
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header user={user} />
        <h2 style={{ textAlign: "center" }}>{error}</h2>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header user={user} />

      <main style={{ padding: "20px" }}>
        <h2>Search results for: "{query}"</h2>

        {results.artists.length > 0 && (
          <section>
            <h3>Artists</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {results.artists.map(a => (
                <div
                  key={a.ID}
                  onClick={() =>
                    navigate("/midterm2/pages/search/expand", {
                      state: { type: "artist", id: a.ID }
                    })
                  }
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  <p><b>Name:</b> {a.Name}</p>
                  <p><b>Role:</b> {a.Role}</p>
                  <p><b>Joined:</b> {new Date(a.CreatedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {results.music.length > 0 && (
          <section>
            <h3>Music</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {results.music.map(m => (
                <div
                  key={m.ID}
                  onClick={() =>
                    navigate("/midterm2/pages/search/expand", {
                      state: { type: "music", id: m.ID }
                    })
                  }
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  <p><b>Title:</b> {m.Title}</p>
                  <p><b>Description:</b> {m.Description}</p>
                  <p><b>Genre:</b> {m.Genre}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {results.genres.length > 0 && (
          <section>
            <h3>Genres</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {results.genres.map(g => (
                <div
                  key={g.ID}
                  onClick={() =>
                    navigate("/midterm2/pages/search/expand", {
                      state: { type: "genre", id: g.ID }
                    })
                  }
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  <p><b>Name:</b> {g.Name}</p>
                  <p>{g.Description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
