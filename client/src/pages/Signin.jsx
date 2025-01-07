import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import './styles/signup.css';
import OAuth from '../components/OAuth';


export default function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleSubmit(e){
    e.preventDefault();
    
    if(!formData.email || !formData.password){
      dispatch(signInFailure('Please fill out all the fields'));
      return;
    }

    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    }catch (error){
      dispatch(signInFailure(error.message));
    }
  }

  function handleChange(e){
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <section className="page-container">
        <div className="form-container">
            <h1 className='form-header-text'>Signin</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label htmlFor='username' > Username/Email  </label>
                    <input 
                            className='input-field'
                            type="text"
                            id= "email"
                            name='email'
                            value={formData.username}
                            onChange={handleChange}
                            required 
                    />
                </div>
                <div className="form-element">
                    <label htmlFor='password'>Password</label>
                    <input
                        className='input-field' 
                        type="password"
                        id= "password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button
                    className='form-btn' 
                    disabled = {loading}
                    type='submit'
                    >
                    {loading ? "Loading" : "Signin"}
                </button>
                <OAuth loading={loading}/>
            </form>
            <div className='form-p'>
                <p>Don't have an Account? <Link to="/signup"> Signup</Link> </p>
            </div>
        </div>
    </section>
  );
}
