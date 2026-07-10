import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [formError, setFormError] = useState('');
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!form.username || !form.email || !form.password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (form.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p>Register to start shopping.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {(formError || error) && <p className="error-text">{formError || error}</p>}
        <button className="primary-btn" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
