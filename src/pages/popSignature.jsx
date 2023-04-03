import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import SignaturePad  from 'react-signature-canvas';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import { saveSignature } from '../services/contractService';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PopSignature() {
    const signaturePadRef = useRef(null);
    const [user,setUser]=useState({});
    const token =  localStorage.getItem("TOKEN_KEY");
   const navigate=useNavigate();
   
   
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:3000/users/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => {
              console.log(response.data)
              setUser(response.data);
            })
            .catch(error => {
               console.error(error);
            });
          
        } catch (error) {
         
        }
      };
      fetchUser();

  


   
    const handleSave =async() =>{
        const dataURL = signaturePadRef.current.toDataURL(); // get the data URL of the signature
        
        await saveSignature(dataURL,user.id).then((response,err)=>{
          if(response){
            console.log('saved Signature',response)
            navigate('/dashboard/mycontract')
          }   else{
            console.log('error save sig');
          }
     })  


      };


  return (
    <>
      <h1>Sign where ever you want in this rectangle </h1>
      <SignaturePad  
          backgroundColor='#F4F4F4'
           ref={signaturePadRef}
           onEnd={handleSave} 
           canvasProps={{
         
            width: 1000,
            height: 500,
            position:"center",
            className: 'sigCanvas'
            

          }

          }
          />
</>

        

    
   
  
  )
}

export default PopSignature
