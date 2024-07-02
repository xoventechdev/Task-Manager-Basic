import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import axios from "axios";
import { getToken, setToken, setUserDetails } from "../helper/SessionHelper";
import ReduxStore from "../redux/store/ReduxStore";
import {
  setCanceledTask,
  setCompletedTask,
  setInProgressTask,
  setNewTask,
} from "../redux/stateSlice/TaskSlice";
import { UnAuthorizeRequest } from "./UnAuthorizeRequest";
import { HideLoader, ShowLoader } from "../redux/stateSlice/SettingSlice";

const BaseUrl = "http://localhost:3030/api/v1/";

export const RegistrationRequest = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userSignUp";
  return axios
    .post(URL, data)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 201) {
        SuccessToast(res.data.response);
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

export const LogInRequest = (data) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "userSignIn";
  return axios
    .post(URL, data)
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
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
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "createTask";
  return axios
    .post(URL, data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const TaskListByStatus = (status) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "listTaskByStatus/" + status;
  return axios
    .get(URL, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        if (status === "new") {
          ReduxStore.dispatch(setNewTask(res.data.response));
        } else if (status === "progress") {
          ReduxStore.dispatch(setInProgressTask(res.data.response));
        } else if (status === "completed") {
          ReduxStore.dispatch(setCompletedTask(res.data.response));
        } else if (status === "canceled") {
          ReduxStore.dispatch(setCanceledTask(res.data.response));
        }
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const UpdateTaskStatus = (id, status) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "updateTaskStatus/" + id + "/" + status;
  return axios
    .get(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};

export const DeleteTaskById = (id) => {
  ReduxStore.dispatch(ShowLoader());
  let URL = BaseUrl + "deleteTask/" + id;
  return axios
    .delete(URL, { headers: { token: getToken() } })
    .then((res) => {
      ReduxStore.dispatch(HideLoader());
      if (res.status === 200 && res.data.status === "success") {
        SuccessToast(res.data.response);
        return true;
      } else {
        ErrorToast(res.data.response);
        return false;
      }
    })
    .catch((error) => {
      ErrorToast(error.message);
      UnAuthorizeRequest(error);
      return false;
    });
};
