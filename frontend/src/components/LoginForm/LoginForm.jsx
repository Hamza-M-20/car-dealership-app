import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { login } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await login(formData);

      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(to right, #1f2937, #111827)'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '32px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '384px' 
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#374151' }}>User Login</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              autoComplete="off"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button type="submit" style={{ 
              flex: 1, 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}>Login</button>
            <button type="button" onClick={() => navigate("/")} style={{ 
              flex: 1, 
              backgroundColor: '#6b7280', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
