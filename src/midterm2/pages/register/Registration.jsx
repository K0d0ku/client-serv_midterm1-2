import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import './Registration.css';

export default function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'Listener',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Registration failed');
      }

      navigate('/midterm2/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="registration-page">
      <Header user={null} />

      <main>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Listener">Listener</option>
            <option value="Artist">Artist</option>
          </select>

          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}
