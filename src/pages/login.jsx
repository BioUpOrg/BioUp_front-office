import React from 'react'
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div class="page-content pt-150 pb-150">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div class="row">
              {/* <div class="col-lg-6 pr-30 d-none d-lg-block">
                <img
                  class="border-radius-15"
                  src="assets/imgs/page/login-1.png"
                  alt=""
                />
              </div> */}
              <div class="col-lg-6 pr-30 d-none d-lg-block">
                <div class="card-login mt-115">
                  <a href="#" class="social-login facebook-login">
                    <img
                      src="assets/imgs/theme/icons/logo-facebook.svg"
                      alt=""
                    />
                    <span>Continue with Facebook</span>
                  </a>
                  <a href="#" class="social-login apple-login">
                    <img src="assets/imgs/theme/icons/logo-apple.svg" alt="" />
                    <span>Continue with Google</span>
                  </a>
                </div>
              </div>
              <div class="col-lg-6 col-md-8">
                <div class="login_wrap widget-taber-content background-white">
                  <div class="padding_eight_all bg-white">
                    <div class="heading_s1">
                      <h1 class="mb-5">Login</h1>
                      <p class="mb-30">
                        Don't have an account?
                        <Link to={"/Register"}>Create here</Link>
                      </p>
                    </div>
                    <form method="post">
                      <div class="form-group">
                        <input
                          type="text"
                          name="email"
                          placeholder="Username or Email *"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="Your password *"
                        />
                      </div>
                      <div class="login_footer form-group">
                        <div class="chek-form">
                          <input
                            type="text"
                            name="email"
                            placeholder="Security code *"
                          />
                        </div>
                        <span class="security-code">
                          <b class="text-new">8</b>
                          <b class="text-hot">6</b>
                          <b class="text-sale">7</b>
                          <b class="text-best">5</b>
                        </span>
                      </div>
                      <div class="login_footer form-group mb-50">
                        <div class="chek-form">
                          <div class="custome-checkbox">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleCheckbox1"
                            >
                              <span>Remember me</span>
                            </label>
                          </div>
                        </div>
                        <a class="text-muted" href="#">
                          Forgot password?
                        </a>
                      </div>
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-heading btn-block hover-up"
                          name="login"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
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
