import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ReactQuill from 'react-quill';
import { Client, Storage, ID } from "appwrite";
import 'react-quill/dist/quill.snow.css';
import './styles/createPost.css'

export default function CreatePost() {
  const [fileInput, setFileInput] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [formData, setFormData] = useState({});
  const [imgUploading, setImgUploading] = useState(false);
  const [errMsg, setErroMsg] = useState(null);
  const [publishErr, setPublishErr] = useState(null);
  const navigate = useNavigate();

  const handleFileChange =(e)=>{
    const file = e.target.files[0];
    const ext = file.name.split('.').pop();
    if(ext=== 'png' || ext === 'jpeg' || ext === 'jpg'){
      setErroMsg(null);
      setFileInput(file);
      setImgPreview(URL.createObjectURL(file));
    }else{
      setErroMsg('Only png, jpg and jpeg files are supported');
    }
  };

  const handleUploadImage = ()=>{
    if(!fileInput){
      setErroMsg('No file is selected.');
      return;
    }

    setErroMsg(null);
    setImgUploading(true);
    const client = new Client()
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    const storage = new Storage(client);
    const promise = storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      ID.unique(),
      fileInput
    );

    promise.then((response)=>{
      const downloadURL = storage.getFileDownload(
        import.meta.env.VITE_APPWRITE_BUCKET_ID, 
        response.$id
      );
      console.log(response);
      console.log(`Url: ${downloadURL}`);
      setFormData({...formData, image: downloadURL})
      setImgUploading(false);
    }, (error)=>{
      console.log(error);
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(!res.ok){
        setPublishErr(data.message);
        return;
      }

      if(res.ok){
        setPublishErr(null);
        navigate(`/post/${data.slug}`);
      }
    }catch (err){
      console.log(err);
      setPublishErr('Something went wrong.');
    }
  };



  return (
    <div className='create-post'>
      <h1>Write your article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text"
            placeholder='Title'
            required
            id='title'
            onChange={(e)=> setFormData({...formData, title: e.target.value})} 
          />
          <select 
            name="category" 
            id="category"
            onChange={(e)=> setFormData({...formData, category: e.target.value})}>
                <option value="uncategories">Select a category</option>
                <option value="javascript">JavaScript</option>
                <option value="Reactjs">React.js</option>
                <option value="Nextjs">Next.js</option>
          </select>
        </div>
        <div>
          <input type="file" accept='image/*' onChange={handleFileChange} />
          <button onClick={handleUploadImage} disabled={imgUploading}>
            {imgUploading? "Uploading": "Upload image"}
          </button>
        </div>
        {errMsg && (
          <div className="err-msg">
           {errMsg}
          </div>
        )}
        {imgPreview && (
              <div className="img-preview">
                <img src={imgPreview} alt="img" />
              </div>
        )}
        <ReactQuill
          theme='snow'
          placeholder='write something...'
          onChange={(value)=> setFormData({...formData, content: value})}
          required
        />
        <button>
          Publish
        </button>
        {publishErr && (
          <div className="err-msg">
            {publishErr}
          </div>
        )}
      </form>
    </div>
  )
}
