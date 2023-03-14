import React, { useState } from 'react'
import { Button,Alert, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const RecuperePasswordWithEmail = () => {
  const [showInput, setShowInput] = useState('input1');
  const [buttonName, SetButtonName] = useState('Send');
  const [mm, setmm] = useState('');
  const [visible2,setVisible2]=useState(false)
  const [visible1,setVisible1]=useState(false)
  const [visible3,setVisible3]=useState(false)

  const sendResetCode = async (email) => {
     return axios.put('http://localhost:3000/forget/', { email }).then
      (res => {
    //    console.log(res);
    //    console.log(res.data);
        return res.data;
      }
      )

  };
  
  const ConfirmCode = async (email,codeRecuperation) => {
    return axios.put('http://localhost:3000/forget/verif', { email,codeRecuperation }).then
     (res => {
   //    console.log(res);
   //    console.log(res.data);
       return res.data;
     }
     )

 };
 const ChangePassMail = async (email,password) => {
  return axios.put('http://localhost:3000/forget/changeps', { email,password }).then
   (res => {
 //    console.log(res);
 //    console.log(res.data);
     return res.data;
   }
   )

};


const navigate = useNavigate();

  const handleButtonClick = () => {

    if (showInput === 'input1') {
      const mail = document.getElementById('inputEmail').value;
      setmm(mail);
      sendResetCode(mail).then(response =>{
        console.log("response "+response);

        if(response === "err"){
          console.log("no");
          setVisible1(true);
          setTimeout(()=>{setVisible1(false)},3000)
          return () => {
            console.log("I m unmounting")
          }
        }else{
          setShowInput('input2');
          SetButtonName("Next");
        }
      }
        )

     
     

      

    } else if (showInput === 'input2') {
      const code = document.getElementById('inputCode').value;
      console.log("code",code);
      console.log("mm",mm);

      ConfirmCode(mm,code).then(response =>{
        console.log("response "+JSON.stringify(response) );
        console.log("res.data",JSON.stringify(response.data) );
        console.log("mm",mm);
        console.log("code",code);

        if(response === "err"){
          console.log("no");
          setVisible3(true);
          setTimeout(()=>{setVisible3(false)},3000)
          return () => {
            console.log("I m unmounting")
          }
        }else{
          setShowInput('input3');
          SetButtonName("Submit");
        }
      }
        )
     
    } else if (showInput === 'input3'){
      
      const password = document.getElementById('inputPass1').value;
      const password2 = document.getElementById('inputPass2').value;
      if(password === password2){
        ChangePassMail(mm,password).then(response =>{
                if(response === "err"){
            console.log("no");
          }else if(response === "changed"){
            console.log("yes")
          }
          else{
            console.log("not changed")
          }
        }
          )
          navigate("/Login");

      }else{
        console.log("password not similar");
          setVisible2(true);
          setTimeout(()=>{setVisible2(false)},3000)
          return () => {
            console.log("I m unmounting")
          }
    
      }
      

    //  setShowInput('input1');
     // SetButtonName("Change");
    }
  };



  return (
  
    <Container style={{marginBottom :'13%'}}>  
      {visible2 &&   <Alert style={{ marginTop: "30px" }} variant="danger">
    <p>
      Passwords are not similar
    </p>
     </Alert>}
     {visible1 &&   <Alert style={{ marginTop: "30px" }} variant="danger">
    <p>
      the mail is not found
    </p>
     </Alert>}
     {visible3 &&   <Alert style={{ marginTop: "30px" }} variant="danger">
    <p>
      the verification code is not correct
    </p>
     </Alert>}


        <Row className='justify-content-center'>
      <Col md={6}>

      <Row>
      {showInput === 'input1' && 
      <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" id='inputEmail' placeholder="Enter email"/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
      }

      {showInput === 'input2' && 

      <Form.Group controlId="formBasicEmail">
    <Form.Label>Code</Form.Label>
    <Form.Control type="text" id='inputCode' placeholder="Enter code" />

  </Form.Group>
      }

      
      
      {showInput === 'input3' && (
        <>
            <Form.Label></Form.Label>
        <Form.Group controlId="formBasicPassword">
    <Form.Control type="password" id='inputPass1'  placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword" style={{marginTop : '5%'}}>
    <Form.Control type="password" id='inputPass2'  placeholder="Password" />
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
export default RecuperePasswordWithEmail
