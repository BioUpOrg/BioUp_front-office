import axios from 'axios';
const apiUrl = "https://bio-up-backend-chi.vercel.app/products"
const apiUrlRating = "https://bio-up-backend-chi.vercel.app/rating"
export async function getProducts(){
    return await axios.get(apiUrl);
}
export async function getMyProducts(id){
    return await axios.post(`${apiUrl}/myproducts/${id}`);
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