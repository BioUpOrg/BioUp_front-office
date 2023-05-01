import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import PopSignature from './popSignature';
import { Document, Page ,Text,Image,StyleSheet, PDFDownloadLink, View} from '@react-pdf/renderer';
 import {getMyContract} from '../../services/contractService';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const MyContract = () => {
  const [user,setUser]=useState({});
  const [contractData, setContractData] = useState({});
  const token =  localStorage.getItem("TOKEN_KEY");
  const navigate = useNavigate();

 


useEffect(()=>{
  const fetchUser = async () => {
    const res = await axios.get('http://localhost:3000/users/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(
        async (response)=>{
          console.log("userdata",response.data); 
          await setUser(response.data);
          await getMyContract(response.data.id).then(async (res,err)=>{
            if(res){
              console.log('contract',res)
              await setContractData(res);
              

            }   else{
              console.log('error getting contract data');
            }
          }) ; 
          
      })
    
      .catch(error => {
         console.error(error);
      });
    
  } 
  fetchUser();
},[])



  const styles=StyleSheet.create({
  
    body: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 35,
       marginBottom:20
    },

    text: {
      color:'#000000',
      fontSize: 20,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      display:'flex',
      justifyContent:'flex-start',
      flexDirection:'row',
      flexWrap:'wrap',
     
    },
    image: {
      display:'flex',
      justifyContent:'flex-start',
      flexDirection:'column',
      marginVertical: 15,
      width: 100,
      marginLeft: '2%',
    },
    title: {
      marginTop:20,
      marginLeft:150,
      display:'flex',
      justifyContent:'center',
      flexDirection:'row',
      color: 'black',
      fontFamily:'Times-Roman',
      fontSize: 24,
      fontWeight: 'bold'

    },sercvices:{
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'column',
      color: 'black',
      marginTop:10
    },
    signatureBox: {
      display:'flex',
      justifyContent:'flex-start',
      flexDirection:'column',
      borderWidth: 1,
      borderColor: 'black',
      width: 200,
      height: 50,
      marginLeft: 50,
      marginTop: 50,
    },
    signatureLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 50,
      marginTop: 10,
    },
  })
  const signhandle = async () => {
    if (contractData.signature === "" || null) {
      navigate('/dashboard/popSignature');
    } else {
      Swal.fire({
        title: "Confirmation",
        text: "You have already signed your contract or you don't have a contract to sign.",
        icon: "warning",
        timer: 2000, // 2 seconds
        showConfirmButton: false
      });
    }
  };



  return (
   
    
   <> 
   
    <>
    <Button onClick={signhandle}>Sign Your Contract </Button>
    <Document style={{marginBottom:'10%'}}>
   <Page style={styles.body}>
     <View>
   <Text style={styles.title}> Service Delivery Agreement</Text>
   
    <Image style={styles.image} src={user.pic}></Image>
    
      <Text style={styles.text}>
     <Text style={styles.text}>
      This service delivery agreement is a legally binding contract between  BioUp Shipment System and Ms,Mrs   {user.firstName} {user.lastName} for the services listed below. The agreement is entered into as of  {user&&contractData && <Text >{contractData.dateContract}</Text>}, and shall continue for a period of  {user&&contractData && <Text>{contractData.typeContract}</Text>} unless otherwise cancelled by either party.
      </Text>
      </Text>
      <Text style={styles.sercvices} ><h4 style={styles.sercvices}>Services</h4></Text>
      <Text style={styles.text}>The following services are governed by the terms of this service delivery agreement:</Text>
      <Text style={styles.sercvices} >Service 1</Text>
      <Text style={styles.sercvices} >Service 2</Text>
      
       <Text  style={styles.sercvices}><h4>Payment</h4></Text>
       <Text style={styles.text }>Payment for services will be made as follows:</Text>
       <Text  style={styles.text} >your payment is based on your vehicle Type provided previously.
       </Text>
       <Text style={styles.text}>
       In consideration of the services listed above, Our Company shall pay ,  {user&&contractData&&<Text> {contractData.salary}  dinar each 100Km , </Text> } as described in The previous Application Form.
       </Text>
       <Text style={styles.text}>
       This service delivery agreement shall be governed by the laws of {user.firstName} {user.lastName}
       </Text>
       <Text style={styles.text} >By signing below, both parties hereby enter into this service delivery agreement with one another as of the date of this agreement.</Text>


     
     
       <View style={styles.signatureBox} >
       {user&&contractData&&<img src={contractData.signature} alt='signature'></img>}
       </View>
       </View>
   </Page>
 </Document>
 </>
    <>
     
       <PDFDownloadLink document={ <Document style={{marginBottom:'10%'}}>
   
       <Page style={styles.body}>
         <View>
       <Text style={styles.title}> Service Delivery Agreement</Text>
       
        <Image style={styles.image} src={user.pic}></Image>
        
          <Text style={styles.text}>
         <Text style={styles.text}>
          This service delivery agreement is a legally binding contract between  BioUp Shipment System and Ms,Mrs   {user.firstName} {user.lastName} for the services listed below. The agreement is entered into as of  {user&&contractData && <Text >{contractData.dateContract}</Text>}, and shall continue for a period of  {user&&contractData && <Text>{contractData.typeContract}</Text>} unless otherwise cancelled by either party.
          </Text>
          </Text>
          <Text style={styles.sercvices} ><h4 style={styles.sercvices}>Services</h4></Text>
          <Text style={styles.text}>The following services are governed by the terms of this service delivery agreement:</Text>
          <Text style={styles.sercvices} >Service 1</Text>
          <Text style={styles.sercvices} >Service 2</Text>
          
           <Text  style={styles.sercvices}><h4>Payment</h4></Text>
           <Text style={styles.text }>Payment for services will be made as follows:</Text>
           <Text  style={styles.text} >your payment is based on your vehicle Type provided previously.
           </Text>
           <Text style={styles.text}>
           In consideration of the services listed above, Our Company shall pay ,  {user&&contractData&&<Text> {contractData.salary}  dinar each 100Km , </Text> } as described in The previous Application Form.
           </Text>
           <Text style={styles.text}>
           This service delivery agreement shall be governed by the laws of {user.firstName} {user.lastName}
           </Text>
           <Text style={styles.text} >By signing below, both parties hereby enter into this service delivery agreement with one another as of the date of this agreement.</Text>
           <View style={styles.signatureBox} >
           {user&&contractData&&<Image src={contractData.signature}></Image>}
        

           </View>
           </View>
       </Page>
     </Document>

       }

        fileName="mycontract">
      {({loading}) => loading ? ( <Button style={{marginLeft:'70%'}} >Please wait , Loading contract information ... </Button>) : <Button style={{marginLeft:'70%'}}>Download Contract PDF</Button>}
    </PDFDownloadLink>
    

</>
</> 
  )
}


export default MyContract;

