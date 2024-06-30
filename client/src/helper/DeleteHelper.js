import Swal from "sweetalert2";
import { DeleteTaskById, UpdateTaskStatus } from "../apiRequest/APIRequest";

export const DeleteTask = (id) => {
  return Swal.fire({
    title: "Delete Task",
    text: "Do you want to delete this task?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete this!",
  }).then((result) => {
    if (result.isConfirmed) {
      return DeleteTaskById(id).then((res) => {
        return res;
      });
    }
  });
};
