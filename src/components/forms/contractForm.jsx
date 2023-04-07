import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {addContract} from '../../services/contractService';
import vt from '../inputs/vehicleTypes.json';
import vehicleBrands from '../inputs/vehicleMarques.json';
import vm from '../inputs/vehicleModels.json';
import vc from '../inputs/payloadCapacity.json';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { color } from '@mui/system';

function ContractForm() {

  const [vehicleType, setvehicleType] = useState('cars');
  const [salary, setSalary] = useState(20);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [typeContract, setTypeContract]=useState('Trimestrial'); 
  const [vehicleMarque, setvehicleMarque]=useState(null);
  const[capacite,setcapacite]=useState(null); 
  const [vehicleModel,setvehicleModel]=useState(null);
  const [user,setUser]=useState({});
  const [vehicleBrandsList, setVehicleBrandsList] = useState([]);
   const [modelList, setModelList] = useState([]);
 const [vcList,setvcList]=useState([]);
 const [matricule,setmatricule]=useState('');
 const [selectedDate, setSelectedDate] = useState(null);
 const navigate = useNavigate();
 const [email,setEmail]=useState(''); 
  const token =  localStorage.getItem("TOKEN_KEY");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(' http://localhost:3000/users/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            console.log(response.data)
            setUser(response.data);
            setEmail(response.data.email);
          })
          .catch(error => {
             console.error(error);
          });
        
      } catch (error) {
       
      }
    };

    fetchUser();
  }
  , 
  []);

 
  useEffect(() => {
    if (vehicleType === 'cars') {
      setVehicleBrandsList(vehicleBrands.carBrands);
       setvcList(vc.payload_capacities.cars);
       setSalary(20);
    } else if (vehicleType === 'trucks') {
      setVehicleBrandsList(vehicleBrands.truckBrands);
      setvcList(vc.payload_capacities.trucks);
      setSalary(25);
     } else if (vehicleType === 'vans') {
      setVehicleBrandsList(vehicleBrands.vanBrands);
      setvcList(vc.payload_capacities.vans);
      setSalary(30);
    }
  }, [vehicleType]);
const fetchModel = ()=>{
  
}
  useEffect(() => {
    if (vehicleMarque === 'Audi') {
      setModelList(vm.Audi);
    } else if (vehicleMarque === 'BMW') {
      setModelList(vm.BMW);
    } else if (vehicleMarque === 'Citroen') {
      setModelList(vm.Citroen);
    } else if (vehicleMarque === 'Dacia') {
      setModelList(vm.Dacia);
    } else if (vehicleMarque === 'Fiat') {
      setModelList(vm.Fiat);
    } else if (vehicleMarque === 'Ford') {
      setModelList(vm.Ford);
    } else if (vehicleMarque === 'Honda') {
      setModelList(vm.Honda);
    } else if (vehicleMarque === 'Hyundai') {
      setModelList(vm.Hyundai);
    } else if (vehicleMarque === 'Kia') {
      setModelList(vm.Kia);
    } else if (vehicleMarque === 'Mercedes') {
      setModelList(vm.Mercedes);
    } else if (vehicleMarque === 'Nissan') {
      setModelList(vm.Nissan);
    } else if (vehicleMarque === 'Opel') {
      setModelList(vm.Opel);
    } else if (vehicleMarque === 'Peugeot') {
      setModelList(vm.Peugeot);
    } else if (vehicleMarque === 'Renault') {
      setModelList(vm.Renault);
    } else if (vehicleMarque === 'Skoda') {
      setModelList(vm.Skoda);
    } else if (vehicleMarque === 'Toyota') {
      setModelList(vm.Toyota);
    } else if (vehicleMarque === 'Volkswagen') {
      setModelList(vm.Volkswagen);
    } else if (vehicleMarque === 'Volvo') {
      setModelList(vm.Volvo);
    }
  }, [vehicleMarque]);

  console.log(vehicleType);
    console.log(vehicleMarque);
    console.log(capacite);
    console.log(vehicleModel);
  const handleSubmit = (event) => {
    event.preventDefault();
  
console.log(typeContract) ;
console.log(user.id);
const vehicle={
  typeVehicle:vehicleType,marque:vehicleMarque,Capacite:capacite,model:vehicleModel,matricule:matricule,dateCirculation:selectedDate
}
    const data = {typeContract,user:user.id,vehicle,salary};
    console.log(data);
     addContract(data).then(response=>{
        console.log(response);
        navigate('/dashboard');
     });



 };
 
  const handleAcceptedRulesChange = (event) => {
    setAcceptedRules(event.target.checked);
  };

  return (
    
    <>
    <Container>
      <Row className='justify-content-center offset-4'>
      <h1 style={{color:'CaptionText' ,marginTop:'5%',marginBottom:'3%' }}> Contract Application Form</h1>   
      </Row>
      <Row className='justify-content-center' style={{marginBottom:'5%'}}>
      <Container style={{
      padding: '30px',
      border: '1px solid #ececec',
      borderRadius: '15px',
      boxShadow: '5px 5px 15px rgba(0,0,0,.05)'
      }}>
        
        <Row className='justify-content-center' >
            <Col md={10}>
         <form onSubmit={handleSubmit}>
      
       <Form.Group  as={Row}>
        <h2 style={{color:"green" ,fontFamily:'sans-serif'}}> Hi,  {user.firstName} {user.lastName} </h2>
        <br/>
       <p style={{marginBottom:'5%',color:"gray",fontFamily:"monospace"}}>this is an application Form for a Delivery agent post , please fill the form and read all agreament rules before sending Form </p>

                <Form.Label  column htmlFor="contractName">  
                    Contract Duration :  
                </Form.Label>
                <Col sm={9}>
              < Form.Select
                value={typeContract}
                onChange={(event) => setTypeContract(event.target.value)}
              >
                <option value="Trimestrial">Trimestrial</option>
                <option value="semestrial">semestrial</option>
                <option value="12 month">12 month</option>

                      
              </Form.Select>
                </Col>
                </Form.Group>
          
        <h3 style={{marginTop:'5%',marginBottom:'5%'}}>Vehicle Information</h3>
        <Row>
          <Form.Group >
                <Form.Label >
                    Vehicle Type:
                </Form.Label>
                <Col >
                  <Form.Select
                     value={vehicleType}
                    onChange={(event) => setvehicleType(event.target.value)}
                    isInvalid={vehicleType === ''}
                    isValid={vehicleType !== ''}
                    required
                  >
               
            {vt.vehicleTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
                    </Form.Select>
                </Col>
                
                </Form.Group>
                <Form.Group >
                <Form.Label >
                    Vehicle Marque:
                </Form.Label>
                <Col>
                  <Form.Select
                  type='text'
                     value={vehicleMarque}
                    onChange={(event) => setvehicleMarque(event.target.value)}
                    required
                     isValid={vehicleMarque !== ''}
                    isInvalid={vehicleMarque === ''}

                 >
            {vehicleBrandsList.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}

                 </Form.Select>
                </Col>
                </Form.Group>


                <Form.Group >
                <Form.Label >
                    vehicle Model :
                </Form.Label>
                <Col>
                  <Form.Select
                  type='text'
                  value={vehicleModel}
                  onChange={(event) => setvehicleModel(event.target.value)}
                  required
                  isValid={vehicleModel !== ''}
                  isInvalid={vehicleModel === ''}
                  >
            {modelList.map((model) => (
               <option  value={model}>
               {model}
             </option>
            ))}

                    </Form.Select>

                </Col>

                </Form.Group>
                <Form.Group >
                <Form.Label>
                  Vehicle Capacite en (kg):
                </Form.Label>
                <Col>
                  <Form.Select
                  type='Select'
                    value={capacite}  
                    onChange={(event) => setcapacite(event.target.value)}
                    required
                    isValid={capacite !== ''}
                    isInvalid={capacite === ''}
                >
                 {
                    vcList.map((c) => (
                      <option value={c}>
                        {c}
                      </option>
                    ))
                    
                 }
                  </Form.Select>
      
                </Col>
                </Form.Group>

                <Form.Group >
                <Form.Label>
                  Vehicle Matricule:
                </Form.Label>
                <Col>
                  <Form.Control
                  type='text'
                    value={matricule}
                    placeholder='Enter the vehicle matricule number'
                    onChange={(event) => setmatricule(event.target.value)}
                    required
                    isValid={matricule !== ''}
                    isInvalid={matricule === ''}
                />

                      </Col>
                      </Form.Group>
                     
               </Row>
                    <Form.Group style={{marginTop:'3%'}}>
                      <Row>
                      <Col sm={3} className='offset-3' >
                      <Form.Label>
                     Date Circulation : 
                    </Form.Label>
                      </Col>
                    
                    <Col sm={3}>
                    <DatePicker
                        selected={selectedDate}
                      
                        placeholderText='select date Circulation'
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        maxDate={new Date("2023-12-31")}
                        required
                      />
                      </Col>
                      </Row>
                     
                      </Form.Group>
                
     
          <Form.Group as={Row}>
     </Form.Group>           
                <br/>
                <h3  style={{marginTop:'5%',marginBottom:'3%'}}>Service Delivery Agreement</h3>
                 <p>
                 <h4> Based on thoes information provided we can offer you a {salary} Dinar per 100Km </h4>
                    {
                      email==='' ? (
                     <h5 style={{color:'red'}}>If you want to receive your contract by mail in case of accept , you must add an email to your account</h5>
                      ) : (
                        <>
                          {/* Placeholder content */}
                        </>
                      )
                    
                    }
                     {
                      email ? (
                     <h5 style={{color:'green'}}> hi , {user.firstName } {user.lastName} ,Do you want to receive your contract to {user.email} in case of accept ? </h5>
                      ) : (
                        <>
                          {/* Placeholder content */}
                        </>
                      )
                    
                    }
                    <br/>
                    This service delivery agreement is a legally
                    binding contract between us and  for the services listed below. 
                    The agreement if it done shall continue for a period
                    of {typeContract} unless otherwise cancelled by either party.
                 </p>
                 <p> I agree that i will be responsable on any harmless or 
                   loss or damage Touching my future sheepments  .</p>
    <Form.Group as={Row}>
      <Col sm={6}>
      <Form.Label column htmlFor="acceptedRules" style={{color:'red',fontFamily:'monospace',flexWrap:'nowrap',fontSize:'1.5em'}} >
                    I have read and accept the terms and conditions 
                </Form.Label>
      </Col>
              
                <Col sm={6}>
                    <Form.Check
                    type="checkbox"
                    id="acceptedRules"
                    checked={acceptedRules}
                    onChange={handleAcceptedRulesChange}
                    />
                </Col>
        </Form.Group>
        <Button type='submit' disabled={!acceptedRules} > Submit Application</Button>
        </form>
         </Col>
        </Row>
    </Container>
    </Row>
    </Container>
    
   </>
    
   
  );
}

export default ContractForm;