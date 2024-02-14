import React,{useState,useEffect} from 'react'
import {auth,provider} from "./config"
import {signInWithPopup} from "firebase/auth"
import Home from './Home';

function SignIn() {
    const [value,setValue] = useState('');
    const handleclick = () =>{
        signInWithPopup(auth,provider).then((data) =>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
        .catch((error) => {
            console.error('Error Signing In',error);
        })
    }

    useEffect(() =>{
        setValue(localStorage.getItem('email'));

    },[]);


  return (
    <div className='SignIn'>
        {value ? <Home /> :
        <button onClick={handleclick}>Sign In With Google</button>
        }
    </div>
  )
}

export default SignIn