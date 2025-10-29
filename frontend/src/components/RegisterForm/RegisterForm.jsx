import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    profile_image: "",
    username: "",
  });

  const {
    email,
    password,
    password_confirmation,
    first_name,
    last_name,
    profile_image,
    username,
  } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await register(formData);
      setUser(newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      email &&
      username &&
      password &&
      password === password_confirmation &&
      first_name &&
      last_name
    );
  };

  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(to right, #1f2937, #111827)',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '32px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '500px' 
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#374151' }}>Register</h1>
        {message && <p style={{ textAlign: 'center', color: 'red', marginBottom: '16px' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            name="first_name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            name="last_name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            value={password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profile_image">Profile Image URL:</label>
          <input
            type="text"
            id="profile_image"
            value={profile_image}
            name="profile_image"
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button disabled={isFormInvalid()} style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}>Register</button>
          <button onClick={() => navigate("/")} style={{ 
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

export default RegisterForm;
