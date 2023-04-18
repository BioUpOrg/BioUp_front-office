
import axios from "axios";
import instance from '../utils/auth.interceptor'
const urlmyshipment="http://localhost:3000/shipment/MyMission/";


export const getMyMission = async (userid)=>{
    userid=userid || ''
   return axios.get(`${urlmyshipment}${userid}`)
   .then(response => {
     console.log(response.data)
       return response.data;
   })
   .catch(error => {
     console.log(error);
       return error;
   })
 }
 export const getMymissionCommands =async(commandId)=>{
  commandId=commandId||'' 
  return axios.get(`http://localhost:3000/commands/${commandId}`)
  .then(
    response=>{
      console.log(response.data)
      return response.data;
    }
  )
  .catch(error=>{
    console.log(error);
    return error;
  }
  )
 }

 
export const getUserById = async (id)=>{
  id=id || ''
 return axios.get(`http://localhost:3000/users/getById/${id}`)
 .then(response => {
   console.log(response)
     return response;
 })
 .catch(error => {
   console.log(error);
     return error;
 })
}