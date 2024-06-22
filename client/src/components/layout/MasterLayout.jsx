import React, { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MasterLayout = (props) => {
  return (
    <>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <a className="icon-nav m-0 h5">
              <AiOutlineMenuUnfold />
            </a>
            <img className="nav-logo mx-2" src={logo} alt="logo" />
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <div className="user-dropdown">
              <img
                className="icon-nav-img icon-nav"
                src={getUserDetails()["photo"]}
                alt=""
              />
              <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                  <img
                    className="icon-nav-img"
                    src={getUserDetails()["photo"]}
                    alt=""
                  />
                  <h6>{getUserDetails()["firstName"]}</h6>
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink to="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div className="side-nav-open">
        <NavLink className="side-bar-item-active side-bar-item mt-2" to="/" end>
          <RiDashboardLine className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>

        <NavLink
          className="side-bar-item-active side-bar-item mt-2"
          to="/Create"
        >
          <AiOutlineEdit className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>

        <NavLink className="side-bar-item-active side-bar-item mt-2" to="/All">
          <BsListNested className="side-bar-item-icon" />
          <span className="side-bar-item-caption">New Task</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Progress"
        >
          <BsHourglass className="side-bar-item-icon" />
          <span className="side-bar-item-caption">In Progress</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Completed"
        >
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Canceled"
        >
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Canceled</span>
        </NavLink>
      </div>
    </>
  );
};

export default MasterLayout;
