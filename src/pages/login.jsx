import { Link } from "react-router-dom";
import LoginForm from "../components/forms/loginForm";

export default function Login() {
  return (
    <div className="page-content pt-150 pb-150">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div className="row">
              <div className="col-lg-6 pr-30 d-none d-lg-block">
                <div className="card-login mt-115">
                  <a href="#" className="social-login facebook-login">
                    <img
                      src="assets/imgs/theme/icons/logo-facebook.svg"
                      alt=""
                    />
                    <span>Continue with Facebook</span>
                  </a>
                  <a href="#" className="social-login apple-login">
                    <img src="assets/imgs/theme/icons/logo-apple.svg" alt="" />
                    <span>Continue with Google</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-8">
                <div className="login_wrap widget-taber-content background-white">
                  <div className="padding_eight_all bg-white">
                    <div className="heading_s1">
                      <h1 className="mb-5">Login</h1>
                      <p className="mb-30">
                        Don't have an account?
                        <Link to={"/Register"}>Create here</Link>
                      </p>
                    </div>
                    <LoginForm/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
