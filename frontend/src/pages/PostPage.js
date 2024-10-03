import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "./UserContext";

export default function PostPage(_id) {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(postInfo => {
        setPostInfo(postInfo);
        console.log("Post Info:", postInfo); // Debugging post info
      })
      .catch(error => console.error('Fetch error:', error));
  }, [id]);

  // Log user info to debug
  console.log("User Info:", userInfo); // Debugging user info

  if (!postInfo) return '';

  return (
    <div className="post-page" style={postPageStyle}>
      {/* Edit button above title */}
      {userInfo.id === postInfo.author._id && (
        <div style={editRowStyle}>
          <Link to={`/edit/${postInfo._id}`} style={editButtonStyle}>
            <button style={buttonStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit this post
            </button>
            <div style={editButtonContainerStyle}>
          <Link to={`/edit/${_id}`} style={editButtonStyle}>Edit</Link>
        </div>
          </Link>
        </div>
      )}

      <h1 style={titleStyle}>{postInfo.title}</h1>
      <time style={timeStyle}>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div style={authorStyle}>by @{postInfo.author.username}</div>

      <div className="image" style={imageContainerStyle}>
        <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} style={imageStyle} />
      </div>
      <div className="content" style={contentStyle} dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

// Inline styles
const postPageStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};
const editButtonContainerStyle = {
  textAlign: 'center',
  marginBottom: '10px',
};

const editButtonStyle = {
  display: 'inline-block',
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.2s',
};

const titleStyle = {
  fontSize: '32px',
  margin: '10px 0',
  color: '#333',
  textAlign: 'center',
};

const timeStyle = {
  display: 'block',
  margin: '10px 0',
  color: '#999',
  textAlign: 'center',
};

const authorStyle = {
  color: '#666',
  fontSize: '18px',
  textAlign: 'center',
};

const editRowStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  padding: '10px 0',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};



const buttonStyle = {
  backgroundColor: '#333',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const imageContainerStyle = {
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: '20px',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const contentStyle = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '1.6',
};
