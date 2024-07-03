import React, { Fragment, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail, IsEmpty } from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { LogInRequest } from "../../../apiRequest/APIRequest";

const Login = () => {
  let emailRef,
    passwordRef = useRef();
  const navigate = useNavigate();

  const onLogin = () => {
    let email = emailRef.value;
    let password = passwordRef.value;
    if (IsEmpty(email) || IsEmpty(password)) {
      ErrorToast("Please fill all fields");
    } else if (IsEmail(email)) {
      ErrorToast("Please enter a valid email");
    } else {
      LogInRequest({
        email: email,
        password: password,
      }).then((res) => {
        if (res) {
          window.location.href = "/";
        }
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h4>SIGN IN</h4>
                <ToastContainer />
                <br />
                <input
                  ref={(input) => (emailRef = input)}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <input
                  ref={(input) => (passwordRef = input)}
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={onLogin}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
                <hr />
                <div className="float-end mt-3">
                  <span>
                    <Link
                      className="text-center ms-3 h6 animated fadeInUp"
                      to="/Registration"
                    >
                      Sign Up{" "}
                    </Link>
                    <span className="ms-1">|</span>
                    <Link
                      className="text-center ms-3 h6 animated fadeInUp"
                      to="/password-reset"
                    >
                      Forget Password
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
