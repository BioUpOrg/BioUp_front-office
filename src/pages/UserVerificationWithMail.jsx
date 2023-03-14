import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const UserVerificationWithMail = () => {
const [msg,setMsg]=useState('');
const {token}= useParams();
const urlverifMail ="http://localhost:5000/users/check/activate/account/";
 const verifyToken= async (token)=>{
    token = token || ''
    return axios.get(`${urlverifMail}${token}`)
        .then(response => {
          console.log(response.data)
            return response.data;
        })
        .catch(error => {
            return error;
        })
 }
    const status= verifyToken(token).then(response=>{
        console.log(response);
    console.log("res",response);
    if(response ==="verified"){
        setMsg("Your account has been verified");
    }else{
        setMsg("Your account Not Verified");
    }
    
 })


  return (
    <div>
      <h1>{msg}</h1>
    </div>
  )
}

export default UserVerificationWithMail
