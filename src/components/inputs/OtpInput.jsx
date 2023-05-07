import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Label } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:3000/users/check/activate/accountsms/";
const urlupdate="http://localhost:3000/users/updateactivationcodesms/";
const urlverifphoneexist="http://localhost:3000/users/existphone/";

export const verifyAccountSms = (smscode) => {
    smscode = smscode || '';
    return axios.get(`${url}${smscode}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        })
}
const updateCodeSms = async (phone) => {
  phone = phone || '';
  return axios.put(`${urlupdate}${phone}`)
      .then(response => {
          return response.data;
      })
      .catch(error => {
          return error;
      })
}
const verifUserExistByPhone = async(phone) =>{
  phone = phone || '';
  return axios.get(`${urlverifphoneexist}${phone}`)
      .then(response => {
          return response.data;
      })
      .catch(error => {
          return error;
      })
}
const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const [ msg, setMsg] = useState('');
  const [col,setColor] =useState('#000000');
  const [phoneInput,setphoneInput]=useState(true);
  const [sendbtn,showsendbtn] =useState(true) ;
  const [Msgphone,setMsgphone]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigate=useNavigate('');
  function handlePhoneNumberChange(event) {
    const { value } = event.target.value;
    setPhoneNumber(value);
    setMsgphone('Dont forget To PUT Your Country Code '); 

    if(!isValidPhoneNumber){
      setMsgphone('Phone Number is not valid');
      setTimeout(() => {
        setMsgphone('');
      }, 10000);
      

    }

    // Regular expression to validate phone number
    
    const phoneRegex = /^\+216\d{8}$/;

    setIsValidPhoneNumber(phoneRegex.test(value));
  }

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
    setMsg(event.target.value);
    setColor(event.target.value)
  };
  const handleResend =(event)=>{
    event.preventDefault();
  
    const phoneInputValue = document.getElementById('phone-input').value;
     verifUserExistByPhone(phoneInputValue).then(response=>{
        if(JSON.stringify(response)===JSON.stringify('exist')){
          setphoneInput(true);
          showsendbtn(true);
            setMsg(`Resending code to .... ${phoneInputValue}`);
             updateCodeSms(phoneInputValue);
             setMsg('sending code successfully');
             setColor('green')
             setTimeout(() => {
              setMsg('')
             }, 3000);
        
        }else{
          setMsg('Canot Found An Account With This Number');
          setTimeout(() => {
            setMsg('');
          }, 3000);
          setColor('#cf0000');
        }
      
     })
   
  }
  
 const handleResentCode =async (event)=>{
 event.preventDefault();
   setphoneInput(false);
    showsendbtn(false);

 }
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Envoyer une requête à votre backend pour vérifier le code OTP
     await verifyAccountSms(otp).then(response => {
      if (response) {
        // Code SMS valide, activer le compte
        console.log('Compte activé !'+ JSON.stringify(response));
        setMsg(response);
        if(JSON.stringify(response)===JSON.stringify('activation avec succées')){
          setColor('#00920f');
          navigate('/Login');
        }
        else{
          setColor('#cf0000');
        }
      } 
     
    }).catch(error => {
      // Afficher un message d'erreur s'il y a une erreur lors de la vérification
      console.log('Erreur lors de la vérification du code SMS :', error.message);
      setMsg('internal erreur');
      setColor('#cf0000');
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
             <Form.Label style={{ color: col }}>
                <h5 className="mb-2 text-center">
                  <span style={{ color: col }}>{msg}</span>
                  <p style={{color:col}}>{Msgphone} </p>
                </h5>
                
              </Form.Label>    
              <Container>
                <Row>
                  </Row>
                  <Form.Control
                    type="text"
                    maxLength={10}
                    value={otp}
                    placeholder='Recuperation code'
                    onChange={handleOtpChange}
                    required
                  />
                  <Row>
                     <Col md="9">
                     <Form.Control style={{marginTop:'5%'}}
                    type="text"
                    placeholder='phone number '
                    id='phone-input'
                    maxLength={12}
                    minLength={12}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    hidden={phoneInput}
                    
                  /></Col>
                  <Col md="3">
                  <Button
                  style={{marginTop:'15%'}}
                  hidden={sendbtn}
                  onClick={handleResend}
                  >Send</Button>
                  </Col>
                  </Row>
                  
                   
                   
                  <Row>
                    <a onClick={handleResentCode}><span>Resent Me The Code </span></a>
                  </Row>
                </Container>              
                 
                   

              <Button type="submit" style={{margin:'5%'}}>Vérifier le compte</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyAccount;
