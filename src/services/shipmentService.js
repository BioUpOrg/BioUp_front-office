
import axios from "axios";
import { BASE_URL, COMMANDS_ENDPOINT, SHIPMENT_ENDPOINT } from "../endpoints";
import axiosInstance from "../utils/auth.interceptor";
const urlmyshipment=SHIPMENT_ENDPOINT+"/MyMission/";


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
  return axios.get(BASE_URL+`commands/${commandId}`)
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
 return axios.get(BASE_URL+`users/getById/${id}`)
 .then(response => {
   console.log(response)
     return response;
 })
 .catch(error => {
   console.log(error);
     return error;
 })
}

export const addCommand = async (command) => {
  const response = await axiosInstance.post(COMMANDS_ENDPOINT, command);
  return response;
};
export const updateMylocation =async (position,agent_id)=>{
  agent_id=agent_id || ''
  
  return axios.put(SHIPMENT_ENDPOINT+`/updateMylocation/${agent_id}`,{position})
  .then(response => {
    console.log(response)
      return response;
  })
  .catch(error => {
    console.log(error);
      return error;
  })
 
}
export const getMyOrderLocation = async (trackid) => {
  trackid=trackid || ''
  try {
    const response = await axios.get(SHIPMENT_ENDPOINT+`/getMyOrderLocation/${trackid}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllshipments =async()=>{
  try{
    const res=await axios.get(SHIPMENT_ENDPOINT+`/getAllShipment`);
    return res;
  }catch(e){
    console.log(e);
    return e;
  }

}
export const deleteshipment =async (idshipment)=>{
  idshipment =idshipment || '';
  try{
    const res=await axios.delete(SHIPMENT_ENDPOINT+`/deleteShipment/${idshipment}`);
    return res;
  }catch(e){
    console.log(e);
    return e;
  }


}




