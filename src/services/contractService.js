import axios from "axios";
const urladdContrat="http://localhost:3000/contract/addnewContract/"
const addContract =  (data)=>{
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
export default addContract;
