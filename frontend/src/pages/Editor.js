import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the snow theme
import React, { forwardRef,useEffect } from "react";


export default function Editor({value,onChange}) {


  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'], // Remove formatting button
    ],
  };
  
  return (
    <div className="content">
    <ReactQuill
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
    </div>
  );
}
