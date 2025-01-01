import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './styles/Signup.css'

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        conformPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e){
        const {name, value}  = e.target;
        setFormData({...formData, [name]: value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(formData.password != formData.conformPassword){
            setError("Password do not match");
            return;
        }

        try{
          setLoading(true);
          setError("");
          const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const data = await res.json();

          if(data.success === false){
            setError(data.message);
            return;
          }

          setLoading(false);
          if(res.ok){
            navigate('/signin')
          }
        }catch (error){
          setError(error.message);
          setLoading(false);
        }

        // setError("");
        // console.log(formData);
    }

  return (
    
    <section className="page-container">
        <div className="form-container">
            <h1 className='form-header-text'>Create your account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-element">
                    <label htmlFor='username' > Username  </label>
                    <input 
                            className='input-field'
                            type="text"
                            id= "username"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            required 
                    />
                </div>
                <div className="form-element">
                    <label htmlFor='emal'>Email</label>
                    <input 
                        className='input-field'
                        type="email"
                        id= "email"
                        name='email'
                        value={formData.email}
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
                <div className="form-element">
                    <label htmlFor='conformPassword'>Conform password</label>
                    <input 
                        className='input-field'
                        type="password"
                        id= "conformPassword"
                        name='conformPassword'
                        value={formData.conformPassword}
                        onChange={handleChange}
                        required 
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button
                    className='form-btn' 
                    type='submit'
                    disabled = {loading}
                    >
                    {loading ? "Loading": "Singup"}
                </button>
                <button className='form-btn'
                    disabled={loading}>
                    <i className="fa-brands fa-google">
                        </i>Signup with Google
                </button>
            </form>
            <div className='form-p'>
                <p>Already have an account. <Link to="/login">Login</Link> </p>
            </div>
        </div>
    </section>
  )
}
