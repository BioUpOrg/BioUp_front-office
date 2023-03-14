import axios from "axios";
import { BASE_URL } from "../endpoints";

export const Login = (data, navigate) => {
  axios
    .post(BASE_URL + "/users/login", data)
    .then((response) => {
      localStorage.setItem("TOKEN_KEY", response.data.token);
      console.log(
        "TOKEN_KEY from localStorage: ",
        localStorage.getItem("TOKEN_KEY")
      );
      // navigate('/dashboard?message= user dashboard');
      window.location.href = "/dashboard";
    })
    .catch((err) => {
      if (err.response.data.error === "USER_NOT_FOUND") {
        navigate("/404?message=USER not found");
      } else if (err.response.data.error === "INCORRECT_PASSWORD") {
        navigate("/401?message=password incorrect");
      } else if (err.response.data.error === "NOT_ACTIVATED") {
        navigate("/401?message= you account is still not activated");
      } else if (err.response.data.error === "BLOCKED") {
        navigate("/401?message=you are blocked please contact the admin");
      }
    });
};

export const existEmail = (email) => {
  // console.log(data);
  axios
    .get(`${BASE_URL}/users/existEmail/${email}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const existPhone = (phone) => {
  axios
    .get(`${BASE_URL}/users/existPhone/${phone}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
