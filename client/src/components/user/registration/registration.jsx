import React, { useRef } from "react";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { RegistrationRequest } from "../../../apiRequest/APIRequest";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef = useRef();

  const onRegistration = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;

    if (IsEmail(email)) {
      ErrorToast("Please enter a valid email");
    } else if (IsEmpty(firstName)) {
      ErrorToast("Please enter first name");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Please enter last name");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Please enter a valid mobile number");
    } else if (IsEmpty(password)) {
      ErrorToast("Please enter password");
    } else {
      let postData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        password: password,
        photo:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADpSURBVDiNndMtS0RBFMbx3xWECxb7BoMYREwa9voZjBaTwbzRD2PyE1gE2WASbBsFk8UXENG2ICbH4Fy8e2fu1d0DTzlnnv/MnDMjhKAtbOAC73jEKVazazPmdUwRWrpD+R/AecZc66S9fkkaw0yus5YDTHsASS0HuOwBpLVMD1Ywkd7/LDeFIppAURQltnGPQ+zhA2NcYRO3IYTP5ASo8Bx3e8UIa1GjmAt4wu7MGFHiJXPsLj1guQk4mMNca7/5DqqezndFxe8YBwsABk3A2wKAH0/swY75e7A185lwjJs/TF+4xlHt+wZsKfCMyXdZ6AAAAABJRU5ErkJggg==",
      };
      RegistrationRequest(postData).then((res) => {
        if (res) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row  justify-content-center">
        <div className="col-md-10 col-lg-10 center-screen">
          <div className="card animated fadeIn w-100 p-3">
            <div className="card-body">
              <h4>Sign Up</h4>
              <ToastContainer />
              <hr />
              <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0">
                  <div className="col-md-4 p-2">
                    <label>Email Address</label>
                    <input
                      ref={(input) => (emailRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>First Name</label>
                    <input
                      ref={(input) => (firstNameRef = input)}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Last Name</label>
                    <input
                      ref={(input) => (lastNameRef = input)}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Mobile Number</label>
                    <input
                      ref={(input) => (mobileRef = input)}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Password</label>
                    <input
                      ref={(input) => (passwordRef = input)}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                    />
                  </div>
                </div>
                <div className="row mt-2 p-0 justify-content-center">
                  <div className="col-md-4 p-2">
                    <button
                      onClick={onRegistration}
                      className="btn mt-3 w-100 float-end btn-primary animated fadeInUp"
                    >
                      Complete
                    </button>

                    <Link
                      to={"/login"}
                      className="btn mt-1 w-100 float-end btn-dark animated fadeInUp"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
