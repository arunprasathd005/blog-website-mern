import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(posts => {
        setPosts(posts);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Blog Posts</h1>
      {posts.length > 0 ? (
        <div style={postsContainerStyle}>
          {posts.map(post => (
            <div key={post._id} style={postContainerStyle}>
              <Post {...post} cover={post.cover} style={postStyle} />
            </div>
          ))}
        </div>
      ) : (
        <p style={noPostsStyle}>No posts available.</p>
      )}
    </div>
  );
}

// Inline styles
const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
};

const headerStyle = {
  textAlign: 'center',
  color: '#333',
  fontSize: '32px',
  marginBottom: '20px',
};

const postsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const postContainerStyle = {
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  position: 'relative',
  background: 'linear-gradient(to bottom right, #f0f8ff, #e6e6fa)', // Gradient background
  cursor: 'pointer',
};

const postStyle = {
  padding: '15px',
  position: 'relative',
  zIndex: 1, // Ensure content is above the gradient background
};

const noPostsStyle = {
  textAlign: 'center',
  color: '#666',
  fontSize: '18px',
};

// Adding hover effects for better interactivity
const postHoverStyle = {
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  },
};
