import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import SignaturePad from 'react-signature-canvas';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useRef } from 'react';
import { saveSignature } from '../../services/contractService';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PopSignature() {
  const signaturePadRef = useRef(null);
  const [user,setUser] = useState({});
  const token =  localStorage.getItem("TOKEN_KEY");
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUser();
  }, []);
  
  const handleSave = async () => {
    const dataURL = signaturePadRef.current.toDataURL(); // get the data URL of the signature
    
    await saveSignature(dataURL,user.id).then((response,err)=>{
      if(response){
        console.log('saved Signature',response)
        navigate('/dashboard/mycontract')
      } else {
        console.log('error save sig');
      }
    });  
  };

  const canvasProps = {
    className: 'modal-content',
    style: {
      width: '100%',
      height: '60vh',
      maxHeight: '500px'
    }
  };

  return (
    <>
      <SignaturePad  
        ref={signaturePadRef}
        canvasProps={canvasProps}
      />
      
      <Container>
        <Row className='justify-content-center'>
          <Col  xs={12} sm={9} md={8}>
          </Col>
          <Col xs={12} sm={9} md={8}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Button style={{flex: 1, marginRight: '8px'}} onClick={handleSave}>         
                Save Signature
              </Button>
              <Button style={{flex: 1}} onClick={() => signaturePadRef.current.clear()}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PopSignature;
