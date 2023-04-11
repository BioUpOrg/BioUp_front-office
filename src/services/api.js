import axios from 'axios';
const apiUrl = "http://localhost:3000/products"
const apiUrlRating = "http://localhost:3000/rating"
export async function getProducts(){
    return await axios.get(apiUrl);
}
export async function getProduct(id){
    return await axios.get(`${apiUrl}/${id}`);
}
export async function addProduct(product){
    return await axios.post(apiUrl,product);
}
export async function updateProduct(id,product){
    return await axios.patch(`${apiUrl}/${id}`,product)
}
export async function deleteProduct(id){
    return await axios.delete(`${apiUrl}/${id}`);
}
export async function addRating(rating){
    return await axios.post(apiUrlRating,rating);
}
export async function getRating(product){
    return await axios.get(`${apiUrlRating}/${product}`);
}