import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import axios from "axios";
import { getToken, setToken, setUserDetails } from "../helper/SessionHelper";

const BaseUrl = "http://localhost:3030/api/v1/";

export const RegistrationRequest = (data) => {
  let URL = BaseUrl + "userSignUp";
  return axios
    .post(URL, data)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      ErrorToast(error.message);
      return false;
    });
};

export const LogInRequest = (data) => {
  let URL = BaseUrl + "userSignIn";
  return axios
    .post(URL, data)
    .then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.status === "success") {
        setToken(res.data.token);
        setUserDetails(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ErrorToast(error.message);
      return false;
    });
};

export const CreateTask = (data) => {
  let URL = BaseUrl + "createTask";
  return axios
    .post(URL, data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      ErrorToast(error.message);
      return false;
    });
};
