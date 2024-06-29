import { removeSessions } from "../helper/SessionHelper";

export const UnAuthorizeRequest = (error) => {
  if (error.response.status === 401) {
    removeSessions();
  }
};
