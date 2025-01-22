import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/createPost.css'

export default function CreatePost() {
  return (
    <div className='create-post'>
      <h1>Write your article</h1>
      <form >
        <div>
          <input 
            type="text"
            placeholder='Title'
            required
            id='title' 
          />
          <select name="category" id="category">
            <option value="uncategories">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="Reactjs">React.js</option>
            <option value="Nextjs">Next.js</option>
          </select>
        </div>
        <div>
          <input type="file" accept='image/*' />
          <button>Upload image</button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='write something...'
          required
        />
        <button>
          Publish
        </button>
      </form>
    </div>
  )
}
