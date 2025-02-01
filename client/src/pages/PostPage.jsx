import React from 'react'
import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import './styles/postPage.css'

export default function PostPag() {
    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(()=>{
        const fetchPost = async ()=>{
            try{
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            }catch (err){
                setError(true);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);
    
    if(loading)
        return(
            <div className="post-page-loading">
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </div>
        );
    return(
        <div className="post-page">
            {
                post && (
                    <>
                        <h1 className='post-page-header'>{post.title}</h1>
                        <p className='post-category'>
                            <Link  to={`/search?category=${post.category}`}>
                                <button>{post.category}</button>
                            </Link>
                        </p>
                        <img className='post-img' src={post.image} alt={post.title} />
                        <div className="date-and-read-time">
                            <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span className="read-time">{(post.content.length/1000).toFixed(0)} mins read</span>
                        </div>
                        <hr />
                        <div className="post-content"
                            dangerouslySetInnerHTML={{__html: post && post.content}}
                        >

                        </div>
                    </>
                )
            }
            <div className="cta-box">
                <CallToAction />
            </div>
        </div>
    )
}
