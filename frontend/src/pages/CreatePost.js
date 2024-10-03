// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import {useState} from "react";
// import {Navigate} from "react-router-dom";
// import Editor from "../pages/Editor";

// export default function CreatePost() {
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [content, setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect, setRedirect] = useState(false);

//   async function createNewPost(ev) {
    
    
//     // Check if file is selected
//     if (!files[0]) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('file', files[0]);  // Ensure file exists
//     ev.preventDefault();
//     const response = await fetch('http://localhost:4000/post', {
//       method: 'POST',
//       body: data,
//       credentials: 'include',
//     });

//     if (response.ok) {
//       setRedirect(true);
//     } else {
//       alert('Failed to create post. Please try again.');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={'/'} />;
//   }

//   return (
//     <form onSubmit={createNewPost}>
//       <input 
//         type="text" 
//         placeholder="Title" 
//         value={title} 
//         onChange={ev => setTitle(ev.target.value)} 
//       />
//       <input 
//         type="text" 
//         placeholder="Summary" 
//         value={summary} 
//         onChange={ev => setSummary(ev.target.value)} 
//       />
//       <input 
//         type="file" 
//         onChange={ev => setFiles(ev.target.files)} 
//       />
//       <Editor value={content} onChange={setContent} />
//       <button style={{ marginTop: '5px' }}>Create post</button>
//     </form>
//   );
// }
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../pages/Editor";

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'], // Remove formatting button
  ],
};

const formats = [
  'header', 'font', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'image', 'align',
];

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    

    // Check if file is selected
    if (!files || files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input 
        type="text" 
        placeholder="Summary" 
        value={summary} 
        onChange={(ev) => setSummary(ev.target.value)} 
      />
      <input 
        type="file" 
        onChange={(ev) => setFiles(ev.target.files)} 
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }} disabled={!title || !summary || !content || !files}>
        Create post
      </button>
    </form>
  );
}
