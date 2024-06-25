import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { ErrorToast, IsEmpty } from "../../../helper/FormHelper";
import { ToastContainer } from "react-toastify";
import { CreateTask } from "../../../apiRequest/APIRequest";
const Create = () => {
  let titleRef,
    descriptionRef = useRef();

  const onNew = () => {
    let title = titleRef.value;
    let description = descriptionRef.value;
    if (IsEmpty(title)) {
      ErrorToast("Title is required");
    } else if (IsEmpty(description)) {
      ErrorToast("Description is required");
    } else {
      let postData = { title: title, description: description };
      CreateTask(postData).then((res) => {
        if (res) {
          titleRef.value = "";
          descriptionRef.value = "";
        }
      });
    }
  };
  return (
    <Container fluid={true} className="content-body">
      <Row className="d-flex justify-content-center">
        <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
          <div className="card">
            <div className="card-body">
              <h4>Create New</h4>
              <ToastContainer />
              <br />
              <input
                ref={(input) => (titleRef = input)}
                placeholder="Task Name"
                className="form-control animated fadeInUp"
                type="text"
              />
              <br />
              <textarea
                ref={(input) => (descriptionRef = input)}
                rows={5}
                placeholder="Task Description"
                className="form-control animated fadeInUp"
                type="text"
              />
              <br />
              <button onClick={onNew} className="btn float-end btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Create;
