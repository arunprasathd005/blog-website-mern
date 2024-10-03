import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.status === 409) {
        alert('Username already taken, please choose another.');
        return;
      }
  

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if(!response.ok===200){
        
        alert('registration failed');
      }

     // Parse the response
     const data = await response.json();
     console.log(data); // Should log: { message: 'User registered successfully!' }
     alert('Registration successful!'); // Show success message

     // Navigate to the login page after successful registration
     navigate('/login'); // Change the route to your login page

   } catch (error) {
     console.error('Fetch error:', error);
     alert('Registration failed. Please try again.'); // Show failure message
   }
 }

  return (
    <form onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        required // Optional: Add required attribute for validation
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        required // Optional: Add required attribute for validation
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
