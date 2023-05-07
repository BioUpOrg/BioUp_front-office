
import axios from "axios";
import instance from '../utils/auth.interceptor'
import { CONTRACT_ENDPOINT } from "../endpoints";
const urladdContrat=CONTRACT_ENDPOINT+"addnewContract/";
const urlgetUserContract=CONTRACT_ENDPOINT+"getUserContract/"
const urlsaveSignature=CONTRACT_ENDPOINT+"saveUserSignature/"
 export const addContract = async (data)=>{
    return axios.post(`${urladdContrat}`,{data})
    .then(response => {
      console.log(response.data)
        return response.data;
    })
    .catch(error => {
      console.log(error);
        return error;
    })
}


 export const getMyContract = async (userid)=>{
   userid=userid || ''
  return axios.get(`${urlgetUserContract}${userid}`)
  .then(response => {
    console.log(response.data)
      return response.data;
  })
  .catch(error => {
    console.log(error);
      return error;
  })
}
  export const saveSignature= async (signature,userid)=>{
    return instance.put(`${urlsaveSignature}`,{signature,userid})
    .then(response => {
      console.log(response)
        return response;
    })
    .catch(error => {
      console.log(error);
        return error;
    })
  
}

export const acceptContract=async (contractid)=>{
  contractid=contractid || ''

  return axios.put(CONTRACT_ENDPOINT+`acceptContract/${contractid}`)
  .then(response => {
    if(response){
      console.log("res accept",response)
      return response;
    }else{
      console.log('error')
    }
   
  })
  .catch(error => {
    console.log(error);
      return error;
  })
}
