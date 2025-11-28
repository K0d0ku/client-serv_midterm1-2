import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);       
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!token || !userId || !role) {
      setLoading(false);
      return;
    }

    setUser({ id: userId, role });

    fetch(`http://localhost:8080/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(data => setUserData(data))
      .catch(err => {
        console.error("Profile fetch error:", err);
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(null);
    setUserData(null);
    navigate("/midterm2");
  }

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete account");
      logout();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-body">
          <h2>Loading profile...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header user={user} />

      <main className="profile-body">
        {!user && (
          <>
            <h2>You are not logged in</h2>
            <button onClick={() => navigate("/midterm2/login")}>Login</button>
            <p>Or</p>
            <button onClick={() => navigate("/midterm2/register")}>Create Account</button>
          </>
        )}

        {user && userData && (
          <>
            <h1>Profile</h1>

            <div className="profile-card">
              <p><b>ID:</b> {userData.ID}</p>
              <p><b>Name:</b> {userData.Name}</p>
              <p><b>Email:</b> {userData.Email}</p>
              <p><b>Role:</b> {userData.Role}</p>
            </div>

            <button
              className="update-btn"
              onClick={() =>
                navigate("/midterm2/updateuser", { state: { user: userData } })
              }
            >
              Update Credentials
            </button>
            <br />
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
            <br /><br />
            <button className="delete-btn" onClick={deleteUser}>
              Delete Account
            </button>

            {error && <p className="error">{error}</p>}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
