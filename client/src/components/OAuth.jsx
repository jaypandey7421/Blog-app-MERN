import React from 'react'
import { useDispatch } from 'react-redux';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {signInSuccess} from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'
import {app} from '../firebase'

export default function OAuth({loading}) {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async ()=>{
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});

    try{
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch (err){
      console.log(err);
    }
  }


  return (
    <button className='form-btn'
     onClick={handleGoogleClick}
     type='button'
     disabled={loading}>
     <i className="fa-brands fa-google">
     </i> Signup with Google
    </button>
  );
}
