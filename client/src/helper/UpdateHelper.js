import Swal from "sweetalert2";
import { UpdateTaskStatus } from "../apiRequest/APIRequest";

export const UpdateTask = (id, status) => {
  return Swal.fire({
    title: "Update Task Status",
    text: "Change Task Status",
    showCancelButton: true,
    input: "select",
    inputOptions: {
      new: "New",
      progress: "Progress",
      completed: "Completed",
      canceled: "Canceled",
    },
    inputValue: status,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Update it",
  }).then((result) => {
    if (result.isConfirmed) {
      return UpdateTaskStatus(id, result.value).then((res) => {
        return res;
      });
    }
  });
};
