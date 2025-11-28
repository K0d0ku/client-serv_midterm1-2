import './Header.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ user }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    navigate("/midterm2/pages/search", { state: { query: searchQuery } });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="midterm2-header">
      <div>
        <button onClick={() => navigate("/midterm2")}>Midterm2</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search music, artist, or genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {user ? `Profile (${user.role})` : 'Not logged in'}
        <br/>
        <button onClick={() => navigate("/midterm2/profile")}>
          Profile
        </button>
      </div>
    </header>
  );
}
