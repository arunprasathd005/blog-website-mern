import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./pages/UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch profile');
        }
      })
      .then(userInfo => setUserInfo(userInfo))
      .catch(error => {
        console.error('Error fetching profile:', error);
        setUserInfo(null);
      });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          setUserInfo(null);
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => console.error('Logout error:', error));
  }

  const username = userInfo?.username;

  return (
    <header style={headerStyle}>
      <Link to="/" className="logo" style={logoStyle}>MyBlog</Link>
      <nav style={navStyle}>
        {username ? (
          <>
            <Link to="/create" style={navLinkStyle}>Create new post</Link>
            <a onClick={logout} style={navLinkStyle} key="logout">Logout ({username})</a>
          </>
        ) : (
          <>
            <Link to="/login" style={navLinkStyle}>Login</Link>
            <Link to="/register" style={navLinkStyle}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

// Inline styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 50px', // Adjust padding as needed
  width: '100%', // Ensure header is full width
  backgroundColor: '#282c34',
  color: '#ffffff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  position: 'relative', // Keep relative for potential future positioning
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: '#61dafb',
};

const navStyle = {
  display: 'flex',
  gap: '20px',
};

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s, color 0.3s',
};
