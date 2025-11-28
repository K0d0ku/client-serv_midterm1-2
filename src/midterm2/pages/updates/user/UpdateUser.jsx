import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Header";
import Footer from "../../../Footer";
// import "./updateUser.css";

export default function UpdateUser() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setFormData({
          email: data.Email || "",
          name: data.Name || "",
          password: "",
        });
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`http://localhost:8080/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      navigate("/midterm2/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="midterm2-landing">
        <Header user={user} />
        <main>
          <h2>Loading...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="midterm2-landing update-user-page">
      <Header user={user} />

      <main className="update-user-main">
        {!user && (
          <>
            <h2>You are not logged in</h2>
            <button onClick={() => navigate("/midterm2/login")}>Login</button>
          </>
        )}

        {user && userData && (
          <div className="update-user-container">
            <div className="current-credentials">
              <h3>Current Profile</h3>
              <p><b>ID:</b> {userData.ID}</p>
              <p><b>Name:</b> {userData.Name}</p>
              <p><b>Email:</b> {userData.Email}</p>
              <p><b>Role:</b> {userData.Role}</p>
            </div>

            <div className="update-form">
              <h3>Update Credentials</h3>
              <form onSubmit={handleUpdate}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br/>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br/>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
                <br/>
                <button type="submit">Update</button>
                {error && <p className="error">{error}</p>}
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
