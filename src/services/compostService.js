import axios from "axios";
import { COMPOSTS_ENDPOINT, RATINGS_ENDPOINT } from "../endpoints";
import Swal from "sweetalert2";
import axiosInstance from "../utils/auth.interceptor";

export function SuccessAlert(msg) {
  Swal.fire({
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}

export function ErrorAlert(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
}


export const getComposts = async () => {
  const response = await axios.get(COMPOSTS_ENDPOINT+"/all");
  return response.data;
};

export const getSellerComposts = async () => {
  const response = await axiosInstance.get(COMPOSTS_ENDPOINT+"/GetSellerComposts");
  return response.data;
};

export const getCompost = async (id) => {
  const response = await axios.get(`${COMPOSTS_ENDPOINT}/${id}`);
  return response.data;
};

export const createCompost = async (compost) => {
  const formData = new FormData();
  if (compost.image) {
    formData.append("file", compost.image);
  }
  formData.append("name", compost?.name);
  formData.append("description", compost?.description);
  formData.append("quantityWeight", compost?.quantityWeight);
  formData.append("unitPrice", compost?.unitPrice);
  formData.append("discountOffered", compost?.discountOffered);
  formData.append("nutrientContent", compost?.nutrientContent);
  formData.append("brandName", compost?.brandName);
  formData.append("manufacturer", compost?.manufacturer);
  formData.append("certification", compost?.certification);
  formData.append("usageInstructions", compost?.usageInstructions);
  formData.append("expirationDate", compost?.expirationDate);
  formData.append("countryOfOrigin", compost?.countryOfOrigin);
  formData.append("packagingType", compost?.packagingType);
  formData.append("type", compost?.type);
  formData.append("availability", "in stock");

  // console.log(formData);
  const response = await axiosInstance.post(COMPOSTS_ENDPOINT, formData);
  console.log("response: ", response);
  console.log("response.data: ", response.data);
  return response.data;
};

export const updateCompost = async (id, compost) => {
  const formData = new FormData();
  if (compost.image) {
    formData.append("file", compost.image);
  }
  formData.append("name", compost?.name || "");
  formData.append("description", compost?.description || "");
  formData.append("quantityWeight", compost?.quantityWeight || "");
  formData.append("unitPrice", compost?.unitPrice || "");
  formData.append("discountOffered", compost?.discountOffered || "");
  formData.append("nutrientContent", compost?.nutrientContent || "");
  formData.append("brandName", compost?.brandName || "");
  formData.append("manufacturer", compost?.manufacturer || "");
  formData.append("certification", compost?.certification || "");
  formData.append("usageInstructions", compost?.usageInstructions || "");
  formData.append("expirationDate", compost?.expirationDate || "");
  formData.append("countryOfOrigin", compost?.countryOfOrigin || "");
  formData.append("packagingType", compost?.packagingType || "");
  formData.append("type", compost?.type || "");
  formData.append("availability", compost?.availability || "in stock");

  const response = await axios.put(`${COMPOSTS_ENDPOINT}/${id}`, formData);
  return response.data;
};

export const deleteCompost = async (id) => {
  const response = await axios.delete(`${COMPOSTS_ENDPOINT}/${id}`);
  return response.data;
};

export const rateCompost = async(idCompost, ratingValue) => {
  debugger;
  const response = await axiosInstance.post(`${RATINGS_ENDPOINT}/${idCompost}/${ratingValue}`)
  debugger;
  return response.data;
}

export const getTopRatedComposts = async () => {
  debugger;
  const response = await axios.get(COMPOSTS_ENDPOINT+"/topRated");
  debugger;
  return response.data;
};


export const getRecentlyAddedComposts = async () => {
  debugger;
  const response = await axios.get(COMPOSTS_ENDPOINT+"/recentlyAdded");
  debugger;
  return response.data;
};


export const getTopSelledComposts = async () => {
  debugger;
  const response = await axios.get(COMPOSTS_ENDPOINT+"/topSelled");
  debugger;
  return response.data;
};

export const getRecommendedCompostsBySoilType = async (soilType) => {
  debugger;
  if (soilType && soilType.predicted_class==="Black Soil") soilType ="Black_Soil"
  if (soilType && soilType.predicted_class==="Cinder soil") soilType ="Cinder_Soil"
  if (soilType && soilType.predicted_class==="Laterite Soil") soilType ="Laterite_Soil"
  if (soilType && soilType.predicted_class==="Peat Soil") soilType ="Peat_Soil"
  if (soilType && soilType.predicted_class==="Yellow Soil") soilType ="Yellow_Soil"

  const response = await axios.get(`${COMPOSTS_ENDPOINT}/recommend/${soilType}`);
  return response.data;
};