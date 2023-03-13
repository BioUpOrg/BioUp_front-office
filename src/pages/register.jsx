import React from 'react'

import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div class="page-content pt-150 pb-150">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-10 col-md-12 m-auto">
            <div class="row">
              <div class="col-lg-6 col-md-8">
                <div class="login_wrap widget-taber-content background-white">
                  <div class="padding_eight_all bg-white">
                    <div class="heading_s1">
                      <h1 class="mb-5">Create an Account</h1>
                      <p>
                        Already have an account?
                        <Link to={"/Login"}>Log in instead!</Link>
                      </p>
                    </div>
                    <form method="post">
                      <div class="form-group">
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                        />
                      </div>
                      <div class="form-group">
                        <input type="text" name="email" placeholder="Email" />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          name="password"
                          placeholder="Confirm password"
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
                      <div class="payment_option mb-50">
                        <div class="custome-radio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="payment_option"
                            id="exampleRadios3"
                          />
                          <label
                            class="form-check-label"
                            for="exampleRadios3"
                            data-bs-toggle="collapse"
                            data-target="#bankTranfer"
                            aria-controls="bankTranfer"
                          >
                            I am a customer
                          </label>
                        </div>
                        <div class="custome-radio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="payment_option"
                            id="exampleRadios4"
                          />
                          <label
                            class="form-check-label"
                            for="exampleRadios4"
                            data-bs-toggle="collapse"
                            data-target="#checkPayment"
                            aria-controls="checkPayment"
                          >
                            I am a vendor
                          </label>
                        </div>
                      </div>
                      <div class="login_footer form-group mb-50">
                        <div class="chek-form">
                          <div class="custome-checkbox">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="checkbox"
                              id="exampleCheckbox12"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleCheckbox12"
                            >
                              <span>I agree to terms &amp; Policy.</span>
                            </label>
                          </div>
                        </div>
                        <a href="page-privacy-policy">
                          <i class="fi-rs-book-alt mr-5 text-muted"></i>Lean
                          more
                        </a>
                      </div>
                      <div class="form-group mb-30">
                        <button
                          type="submit"
                          class="btn btn-fill-out btn-block hover-up font-weight-bold"
                          name="login"
                        >
                          Submit &amp; Register
                        </button>
                      </div>
                      <p class="font-xs text-muted">
                        <strong>Note:</strong>Your personal data will be used to
                        support your experience throughout this website, to
                        manage access to your account, and for other purposes
                        described in our privacy policy
                      </p>
                    </form>
                  </div>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
