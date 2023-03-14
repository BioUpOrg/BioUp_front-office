import { useState } from "react";
import { Login, existEmail, existPhone } from "../../services/authService";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function LoginForm() {
  const navigate = useNavigate(); // defining navigate here

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [emailAlert, setEmailAlert] = useState(null);
  const [phoneAlert, setPhoneAlert] = useState(null);

  const handleEmailBlur = async (e) => {
    console.log(e.target.value);
    const isEmailExist = await existEmail(e.target.value);
    if (!isEmailExist) {
      setEmailAlert(<Alert severity="error">Email not found</Alert>);
      setTimeout(() => {
        setEmailAlert(null);
      }, 2000);
    }
  };

  const handlePhoneBlur = async (e) => {
    // console.log(e.phone);
    const isPhoneExist = await existPhone(e.phone);
    if (!isPhoneExist) {
      setPhoneAlert(<Alert severity="error">Phone number not found</Alert>);
      setTimeout(() => {
        setPhoneAlert(null);
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //call login method in authService
    await Login({ email, password, phone }, navigate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Enter Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleEmailBlur(e)}
        />
        <small>{emailAlert}</small>
      </div>

      <div className="form-group">
        <label htmlFor="tel">phone number: </label>
        <PhoneInput
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          defaultCountry="TN"
          autoComplete="tel"
          onBlur={(e) => handlePhoneBlur({ phone })}
        />
        <small>{phoneAlert}</small>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Enter password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-heading btn-block hover-up"
          name="login"
        >
          Log in
        </button>
      </div>
    </form>
  );
}
