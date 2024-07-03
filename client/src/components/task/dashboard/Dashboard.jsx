import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TaskSummary } from "../../../apiRequest/APIRequest";

const Dashboard = () => {
  useEffect(() => {
    TaskSummary();
  }, []);
  const taskSummary = useSelector((state) => state.summary.value);
  console.log(taskSummary);
  return (
    <>
      <div className="container">
        <div className="row">
          {taskSummary.map((task, i) => (
            <div key={i} className="col-12 col-lg-3 col-sm-6 col-md-3  p-2">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="animated fadeInUp">
                    {task._id[0].toUpperCase() + task._id.substring(1)}
                  </h5>
                  <h6 className="text-secondary animated fadeInUp">
                    {task.count}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
