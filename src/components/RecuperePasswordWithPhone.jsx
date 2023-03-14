import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios';

const RecuperePasswordWithPhone = () => {
  const [showInput, setShowInput] = useState('input1');
  const [buttonName, SetButtonName] = useState('Send');
  const [msg ,setMsg] =useState(''); 
  const [p,setP]=useState('');
  const [cc,setcc]=useState('');

  const urlverifphoneexist="http://localhost:3000/users/existphone/";
  const urlcheckcode="http://localhost:3000/users/check/activate/codeRecupPassBySms/";
  const urlsendCode="http://localhost:3000/users/updateCodeRecupPassBySms/"
  const urlchangepass="http://localhost:3000/users/changepassword/"
  const verifUserExistByPhone = async(phone) =>{
    phone = phone || '';
    return axios.get(`${urlverifphoneexist}${phone}`)
        .then(response => {
          console.log(response.data)
            return response.data;
        })
        .catch(error => {
            return error;
        })
  }
  const sendCodeRecSms = async(phone) =>{
 phone = phone || ''
    return axios.put(`${urlsendCode}${phone}`)
        .then(response => {
          console.log(response.data)
            return response.data;
        })
        .catch(error => {
            return error;
        })
  }

  const verifCodeRec = async(phone,code) =>{
    const data = {phone,code}
    return axios.get(`${urlcheckcode}`,{ params: data })
        .then(response => {
          console.log(response.data)
            return response.data;
        })
        .catch(error => {
          console.log(error);
            return error;
        })
  }
 const changePass =async (phone,password)=>{
  return axios.put(`${urlchangepass}`,{phone,password}).then(response=>{
    return response.data ; 
  }).catch(error=>{
    return error ; 
  })

  }

  const handleButtonClick = () => {
  if (showInput === 'input1') {
    const phone=document.getElementById('inputphone').value;
      setP(phone);
      
      verifUserExistByPhone(phone).then(response=>{
       
        if(JSON.stringify(response)===JSON.stringify('exist')){
          sendCodeRecSms(phone).then(response=>{
            console.log("sendres",response);
            if(response==='sent'){
              setShowInput('input2');
              SetButtonName("Next");
            }else{
              setMsg('Error sending code !')
            }
          })
         
     }else{
        setMsg('Phone does not exist !verify your phone number ')
        }
      })

    
    } else if (showInput === 'input2') {
      const code=document.getElementById('inputcode').value;
      console.log("1",p);
      setcc(code);
      verifCodeRec(p,code).then(response=>{
        console.log("2",code);
        console.log("resp",response);
       console.log('msg','succes');

        if(response==='succes'){
          console.log('code correct')
          setShowInput('input3');
          SetButtonName("Submit");
        }else{
          setMsg('code invalid !')

        }
      })
   
    } else {
      const pass=document.getElementById('inputpass').value;
      const cpass=document.getElementById('inputcpass').value;
      if(pass===cpass){
        console.log('pass:',pass)
        changePass(p,pass).then(response=>{
          console.log(response);
        })
      }else{
        setMsg('The Two field must be identique')
      }
    }
  };



  return (
    <Container style={{marginBottom :'13%'}}>  
        <Row className='justify-content-center'>
      <Col md={6}>
      
      <Row>
      {showInput === 'input1' && 
      <Form.Group >
    <Form.Label>{msg}</Form.Label>
    <Form.Control
     type="text" id='inputphone'
      placeholder="Enter your phone number"/>
    <Form.Text className="text-muted">
      We'll never share your phone with anyone else.
    </Form.Text>
  </Form.Group>
      }

      {showInput === 'input2' && 

      <Form.Group >
    <Form.Label>{msg}</Form.Label>
    <Form.Control type="text" id='inputcode' placeholder="Enter code" />

  </Form.Group>
      }

      
      
      {showInput === 'input3' && (
        <>
            <Form.Label>{msg}</Form.Label>
        <Form.Group >
    <Form.Control type="password" id='inputpass' placeholder="Password" />
  </Form.Group>
  <Form.Group style={{marginTop : '5%'}}>
    <Form.Control type="password" id='inputcpass' placeholder=" Confirm Password" />
  </Form.Group>
        
         
        </>
      )}
      </Row>
   
      
            <Row>

<Col md={9}>
</Col>
<Col md={3} style={{marginTop: '3%' , marginBottom: '3%' }}>
<Button onClick={handleButtonClick}>{buttonName}</Button>
  </Col>

</Row>
</Col>

    </Row>


    </Container>
  
    
  );
      }
export default RecuperePasswordWithPhone