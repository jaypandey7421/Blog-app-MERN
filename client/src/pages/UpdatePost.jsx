import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { Client, Storage, ID } from "appwrite";
import 'react-quill/dist/quill.snow.css';
import './styles/createPost.css'

export default function UpdatePost() {
  const [fileInput, setFileInput] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [formData, setFormData] = useState({});
  const [imgUploading, setImgUploading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [updationErr, setUpdationErr] = useState(null);
  const {currentUser} = useSelector((state)=> state.user);
  const {postId} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    try{
        const fetchPost = async ()=>{
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();

            if (!res.ok){
                console.log(data.message);
                setUpdationErr(data.message);
                return;
            }
            if(res.ok){
                console.log(`Length: ${data.posts.length}`);
                const post = data.posts[0];
                setUpdationErr(null);
                setFormData(post);
                // console.log(post);
            }
        };

        fetchPost();
        //console.log(formData);
    }catch (err){
        console.log(err.message);
    }
  },[postId]);

  const handleFileChange =(e)=>{
    console.log("handleFileChange()");
    const file = e.target.files[0];
    const ext = file.name.split('.').pop();
    if(ext=== 'png' || ext === 'jpeg' || ext === 'jpg'){
      setErrMsg(null);
      setFileInput(file);
      setImgPreview(URL.createObjectURL(file));
    }else{
      setErrMsg('Only png, jpg and jpeg files are supported');
    }
  };

  const handleUploadImage = ()=>{
    console.log('handleUploadImage');
    if(!fileInput){
      setErrMsg('No file is selected.');
      return;
    }

    setErrMsg(null);
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
      setFormData((pre)=> ({...pre, image: downloadURL}));
      setImgUploading(false);
    }, (error)=>{
      console.log(error);
    });
  };

  const handleSubmit = async (e)=>{
    console.log('handleSubmit()');
    e.preventDefault();

    try{
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(!res.ok){
        setUpdationErr(data.message);
        return;
      }

      if(res.ok){
        setUpdationErr(null);
        navigate(`/post/${data.slug}`);
      }
    }catch (err){
      console.log(err);
      setUpdationErr('Something went wrong.');
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
            onChange={(e)=> setFormData((pre)=> ({...pre, title: e.target.value}))} 
            value={formData.title || ''}
          />
          <select 
            name="category" 
            value={formData.category || 'uncategorized'}
            id="category"
            onChange={(e)=> setFormData((pre) =>({...pre, category: e.target.value}))}>
                <option value="uncategorized'}">Select a category</option>
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
        {/* {console.log(formData)} */}
        {(formData.image || imgPreview) && (
              <div className="img-preview">
                <img src={imgPreview || formData.image} alt="img" />
              </div>
        )}
        <ReactQuill
          theme='snow'
          placeholder='write something...'
          value={formData.content || ''}
          onChange={(value)=> {
            console.log("reactQuill onchange");
            setFormData((pre)=>({...pre, content: value}));
          }}
          required
        />
        <button>
          Update post
        </button>
        {updationErr && (
          <div className="err-msg">
            {updationErr}
          </div>
        )}
      </form>
    </div>
  )
}
