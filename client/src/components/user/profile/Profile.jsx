import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getUserData, UserProfileUpdate } from "../../../apiRequest/APIRequest";
import {
  ErrorToast,
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";

const Profile = () => {
  useEffect(() => {
    getUserData();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();
  const UpdateMyProfile = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;

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
      UserProfileUpdate(email, firstName, lastName, mobile, password, photo);
    }
  };
  const PreviewImage = () => {
    const profileImg = userImgRef.files[0];
    getBase64(profileImg).then((res) => {
      userImgView.src = res;
    });
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <ToastContainer />
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={(input) => (userImgView = input)}
                  className="icon-nav-img-lg"
                  src={ProfileData["photo"]}
                  alt=""
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      onChange={PreviewImage}
                      ref={(input) => (userImgRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="file"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["email"]}
                      readOnly={true}
                      ref={(input) => (emailRef = input)}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["firstName"]}
                      ref={(input) => (firstNameRef = input)}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["lastName"]}
                      ref={(input) => (lastNameRef = input)}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["mobile"]}
                      ref={(input) => (mobileRef = input)}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      key={Date.now()}
                      defaultValue={ProfileData["password"]}
                      ref={(input) => (passwordRef = input)}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={UpdateMyProfile}
                      className="btn w-100 float-end btn-primary animated fadeInUp"
                    >
                      Update
                    </button>
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

export default Profile;
