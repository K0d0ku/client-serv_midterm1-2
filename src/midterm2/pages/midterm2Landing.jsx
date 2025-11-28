// npm install jwt-decode
import { jwtDecode } from "jwt-decode"; // this is the right import, if i use others the code breaks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./midterm2landing.css";

const endpoints = {
  users: {
    list_all_users: { url: "http://localhost:8080/users", method: "GET", roles: ["Admin"], requiresInput: false },
    get_user_by_id: { url: "http://localhost:8080/users/:id", method: "GET", roles: ["Admin"], requiresInput: true },
    update_user_by_id: { url: "http://localhost:8080/users/:id", method: "PUT", roles: ["Admin"], requiresInput: true },
    delete_user_by_id: { url: "http://localhost:8080/users/:id", method: "DELETE", roles: ["Admin"], requiresInput: true },
  },

  music: {
    list_all_songs: { url: "http://localhost:8080/music", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: false },
    list_all_Artists: { url: "http://localhost:8080/music/artists", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: false },
    get_song_by_id: { url: "http://localhost:8080/music/:id", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: true },
    artist_Data_by_id: { url: "http://localhost:8080/music/artist-data/:id", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: true },
    artist_music_by_id: { url: "http://localhost:8080/music/artist/:artistId", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: true },
    create_song: { url: "http://localhost:8080/music", method: "POST", roles: ["Admin","Artist"], requiresInput: true },
    update_song_by_id: { url: "http://localhost:8080/music/:id", method: "PUT", roles: ["Admin","Artist"], requiresInput: true },
    delete_song_by_id: { url: "http://localhost:8080/music/:id", method: "DELETE", roles: ["Admin","Artist"], requiresInput: true },
  },

  genres: {
    list_all_genres: { url: "http://localhost:8080/genres", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: false },
    get_genre_by_id: { url: "http://localhost:8080/genres/:id", method: "GET", roles: ["Admin","Artist","Listener"], requiresInput: true },
    create_genre: { url: "http://localhost:8080/genres", method: "POST", roles: ["Admin"], requiresInput: true },
    update_genre_by_id: { url: "http://localhost:8080/genres/:id", method: "PUT", roles: ["Admin"], requiresInput: true },
    delete_genre_by_id: { url: "http://localhost:8080/genres/:id", method: "DELETE", roles: ["Admin"], requiresInput: true },
  },
};

const roleMap = {
  Admin: ["users", "music", "genres"],
  Artist: ["music", "genres"],
  Listener: ["music", "genres"],
};

const UserCard = ({ u }) => (
  <div className="profile-card">
    <p><b>ID:</b> {u.ID}</p>
    <p><b>Name:</b> {u.Name}</p>
    <p><b>Email:</b> {u.Email}</p>
    <p><b>Role:</b> {u.Role}</p>
    <p><b>Created At:</b> {u.CreatedAt}</p>
    {u.UpdatedAt && <p><b>Updated At:</b> {u.UpdatedAt}</p>}
  </div>
);

const ArtistCard = ({ a }) => (
  <div className="profile-card">
    <p><b>ID:</b> {a.ID}</p>
    <p><b>Name:</b> {a.Name}</p>
    <p><b>Email:</b> {a.Email}</p>
    <p><b>Role:</b> {a.Role}</p>
    <p><b>Created At:</b> {a.CreatedAt}</p>
  </div>
);

const MusicCard = ({ s }) => (
  <div className="profile-card">
    <p><b>ID:</b> {s.ID}</p>
    <p><b>Title:</b> {s.Title}</p>
    <p><b>Description:</b> {s.Description}</p>
    <p><b>Genre:</b> {s.Genre?.Name}</p>
    <p><b>Artist:</b> {s.Artist?.Name}</p>
    <p><b>Created At:</b> {s.CreatedAt}</p>
  </div>
);

const GenreCard = ({ g }) => (
  <div className="profile-card">
    <p><b>ID:</b> {g.ID}</p>
    <p><b>Name:</b> {g.Name}</p>
    <p><b>Description:</b> {g.Description}</p>
  </div>
);

const CategoryPanel = ({ category, userRole, endpoints, inputs, setInputs, results, setResults }) => {
  const [expandedActions, setExpandedActions] = useState({});
  const toggleAction = key => setExpandedActions(prev => ({ ...prev, [key]: !prev[key] }));
  const handleInputChange = (actionKey, field, value) => {
    setInputs(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [actionKey]: { ...prev[category]?.[actionKey], [field]: value }
      }
    }));
  };

  const handleAction = async (actionKey) => {
    const token = localStorage.getItem("jwtToken");
    const action = endpoints[category][actionKey];
    if (!action) return;

    let url = action.url;
    let body = null;
    const inputObj = inputs[category]?.[actionKey];

    if (action.requiresInput && inputObj) {
      if (url.includes(":id")) url = url.replace(":id", inputObj.id);
      if (url.includes(":artistId")) url = url.replace(":artistId", inputObj.id);
    }

    if (["POST","PUT"].includes(action.method)) {
      body = { ...inputObj };
      delete body.id;
    }

    const res = await fetch(url, {
      method: action.method,
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null
    });

    const data = await res.json().catch(() => null);
    setResults(prev => ({ ...prev, [category + "_" + actionKey]: { status: res.status, data } }));
  };

  const renderByCategory = (actionKey, payload) => {
    if (!payload) return null;
    if (payload?.message) return <p>{payload.message}</p>;
    if (Array.isArray(payload)) {
      return payload.map(item => {
        if (actionKey === "list_all_Artists" || actionKey === "artist_Data_by_id") return <ArtistCard key={item.ID} a={item} />;
        if (category === "users") return <UserCard key={item.ID} u={item} />;
        if (category === "music") return <MusicCard key={item.ID} s={item} />;
        if (category === "genres") return <GenreCard key={item.ID} g={item} />;
        return null;
      });
    }
    if (actionKey === "artist_Data_by_id") return <ArtistCard a={payload} />;
    if (actionKey === "create_song" || actionKey === "update_song_by_id") return <MusicCard s={payload} />;
    if (category === "users") return <UserCard u={payload} />;
    if (category === "genres") return <GenreCard g={payload} />;
    if (category === "music") return <MusicCard s={payload} />;
  };

  return (
    <div className="category-panel">
      <h4>{category.toUpperCase()}</h4>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {Object.entries(endpoints[category])
          .filter(([_, action]) => action.roles.includes(userRole))
          .map(([actionKey, action]) => {
            const resultKey = category + "_" + actionKey;
            const resultObj = results[resultKey];
            return (
              <div key={actionKey} className="action-tile">
                <button onClick={() => toggleAction(actionKey)}>{actionKey}</button>

                {expandedActions[actionKey] && (
                  <div className="action-dropdown" style={{ width: "150vh", display: "flex", flexDirection: "column", gap: 6 }}>
                    
                    {action.requiresInput && (
                      <>
                        {/* update_user_by_id */}
                        {actionKey === "update_user_by_id" ? (
                          <>
                            <input placeholder="User ID" onChange={e => handleInputChange(actionKey, "id", e.target.value)} />
                            <input placeholder="Name" onChange={e => handleInputChange(actionKey, "name", e.target.value)} />
                            <input placeholder="Email" onChange={e => handleInputChange(actionKey, "email", e.target.value)} />
                            <input placeholder="Password" type="password" onChange={e => handleInputChange(actionKey, "password", e.target.value)} />
                            <select onChange={e => handleInputChange(actionKey, "role", e.target.value)} defaultValue="Artist">
                              <option value="Artist">Artist</option>
                              <option value="Listener">Listener</option>
                            </select>
                          </>
                        ) 
                        /* create_song / update_song_by_id */
                        : ['create_song','update_song_by_id'].includes(actionKey) ? (
                          <>
                            <input placeholder="ID (only for update)" onChange={e => handleInputChange(actionKey, "id", e.target.value)} />
                            <input placeholder="Title" onChange={e => handleInputChange(actionKey, "title", e.target.value)} />
                            <input placeholder="Description" onChange={e => handleInputChange(actionKey, "description", e.target.value)} />
                            <input placeholder="File URL" onChange={e => handleInputChange(actionKey, "file_url", e.target.value)} />
                            <input placeholder="Genre ID" onChange={e => handleInputChange(actionKey, "genre_id", e.target.value)} />
                          </>
                        ) 
                        /* create_genre / update_genre_by_id */
                        : ['create_genre', 'update_genre_by_id'].includes(actionKey) ? (
                          <>
                            {actionKey === 'update_genre_by_id' && (
                              <input placeholder="Genre ID" onChange={e => handleInputChange(actionKey, "id", e.target.value)} />
                            )}
                            <input placeholder="Name" onChange={e => handleInputChange(actionKey, "name", e.target.value)} />
                            <input placeholder="Description" onChange={e => handleInputChange(actionKey, "description", e.target.value)} />
                          </>
                        )
                        /* default ID input */
                        : (
                          <input placeholder="ID" onChange={e => handleInputChange(actionKey, "id", e.target.value)} />
                        )}
                      </>
                    )}

                    <button onClick={() => handleAction(actionKey)}>
                      {action.requiresInput ? "Submit" : "Execute"}
                    </button>

                    {resultObj && (
                      <div className="action-results" style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
                        {renderByCategory(actionKey, resultObj.data)}
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default function Midterm2Landing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.sub, role: decoded.role });
      } catch {
        localStorage.removeItem("jwtToken");
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="midterm2-landing">
        <Header user={null} />
        <main style={{ padding: 20 }}>
          <h1>Midterm 2 for Client service development and Web service development subjects</h1>
          <h2>if you have an account log in</h2>
          <button onClick={() => navigate("/midterm2/login")}>Login</button>
          <h2>or</h2>
          <button onClick={() => navigate("/midterm2/register")}>Register</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="midterm2-landing">
      <Header user={user} />
      <main style={{ padding: 20 }}>
        {roleMap[user.role].map(category => (
          <CategoryPanel
            key={category}
            category={category}
            userRole={user.role}
            endpoints={endpoints}
            inputs={inputs}
            setInputs={setInputs}
            results={results}
            setResults={setResults}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
