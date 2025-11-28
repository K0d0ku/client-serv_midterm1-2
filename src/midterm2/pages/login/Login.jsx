import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();

      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);

      navigate('/midterm2');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="midterm2-login">
      <Header />

      <main>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br/>
          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}
      </main>

      <Footer />
    </div>
  );
}
