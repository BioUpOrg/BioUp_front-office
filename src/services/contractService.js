
import axios from "axios";
import instance from '../utils/auth.interceptor'
const urladdContrat="http://localhost:3000/contract/addnewContract/";
const urlgetUserContract="http://localhost:3000/contract/getUserContract/"
const urlsaveSignature="http://localhost:3000/contract/saveUserSignature/"
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

  return axios.put(`http://localhost:3000/contract/acceptContract/${contractid}`)
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
