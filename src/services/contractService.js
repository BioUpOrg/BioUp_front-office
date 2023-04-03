
import axios from "axios";
import instance from '../utils/auth.interceptor'
const urladdContrat="http://localhost:3000/contract/addnewContract/";
const urlgetUserContract="http://localhost:3000/contract/getUserContract/"
const urlsaveSignature="http://localhost:3000/contract/saveUserSignature/"
 export const addContract =  (data)=>{
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


 export const getMyContract =(userid)=>{
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
  export const saveSignature=(signature,userid)=>{
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