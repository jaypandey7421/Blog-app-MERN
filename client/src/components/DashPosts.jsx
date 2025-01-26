import React, { useEffect, useState } from 'react'
import './styles/dashPosts.css'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

export default function DashPost() {
  const {currentUser} = useSelector(state => state.user);
  const[userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
  
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      }catch(err){
        console.log(err);
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async ()=>{
    const startIndex = userPosts.length;
    try{
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );

      const data = await res.json();
      if(res.ok){
        setUserPosts((prev)=> [...prev, ...data.posts]);
        if(data.posts.length <9){
          setShowMore(false);
        }
      }
    }catch (err){
      console.log(err.message);
    }
  }

  return (
    <div className="dash-posts">
      {currentUser.isAdmin && userPosts.length >0 ? (
        <table>
          <thead>
              <tr>
                <th>Date updated</th>
                <th>Post image</th>
                <th>Post title</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
          </thead>
          <tbody>
              {
                userPosts.map((post, i)=>(
                  <tr key={i}>
                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <img src={post.image} alt={post.title} />
                    </td>
                    <td>
                      <Link to={`post/${post.slug}`}>
                        {post.title.length> 12 ? post.title.substring(0,12): post.title}...
                      </Link>
                    </td>
                    <td>{post.category}</td>
                    <td>Delete</td>
                    <td>
                      <Link to={`update-post/${post._id}`}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              }
          </tbody>
      </table>
      ):(
        <p>You have no posts yet!</p>
      )}
      {showMore && (
        <p className='show-more' onClick={handleShowMore}>Show more...</p>
      )}
    </div>
  )
}
