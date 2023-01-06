import React, { useEffect, useState } from "react";
//
import bgimg from "../media/bgimg.webp";
//
import Navbar from "./Navbar";
//
import "../styles/foreground.css";
import Typewriter from "typewriter-effect";
//
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../state/reducer/userReducer";
import { clearSmsg, clearLmsg } from "../state/reducer/userReducer";
//
import { useNavigate } from "react-router-dom";
//
export default function Foreground() {
  const navigate = useNavigate();
  //
  let userstatus = useSelector((e) => e.userdata);
  const dispatch = useDispatch();
  //
  let contactdata = (e) => {
    e.preventDefault();
    console.log("contact submitted...");
    let dataArray = [];
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray", dataArray);
    // e.target.reset();
  };
  // registration form
  let registrationdata = (e) => {
    e.preventDefault();
    console.log("registration clicked...");
    // let dataArray = [];
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray", dataArray);
    //
    dispatch(registerUser(dataArray));
    // e.target.reset();
  };
  //login form
  let logindata = (e) => {
    e.preventDefault();
    console.log("login clicked...");
    // let dataArray = [];
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray", dataArray);
    //
    dispatch(loginUser(dataArray));
    // e.target.reset();
  };
  //
  useEffect((e) => {
    console.log("userstatus.LOGINmsg from useEffect", userstatus.loginmsg);
    console.log("userstatus.SIGNUPmsg from useEffect", userstatus.signupmsg);
    console.log(
      "localStorageToken from useEffect",
      localStorage.getItem("token")
    );
    //alert for login messages
    if (
      userstatus.loginmsg !== "" &&
      userstatus.loginmsg !== "password matched"
    )
      alert(`${userstatus.loginmsg}`);
    //
    if (userstatus.loginmsg === "password matched") {
      dispatch(clearLmsg());
      navigate("/home");
    }

    //alert for signup messages
    if (userstatus.signupmsg !== "") alert(`${userstatus.signupmsg}`);
    if (userstatus.signupmsg === "User is created") {
      dispatch(clearSmsg());
    }
    //
  });
  //
  return (
    <>
      <Navbar />
      {/* Front Content */}
      <div className="content">
        <div className="part1">
          <p className="line1">Students Forum Platform</p>
          <div className="line2">
            <Typewriter
              options={{
                strings: ["We Connect More", "We Share More", "We Learn More"],
                autoStart: true,
                loop: true,
                delay: 200
              }}
            />
          </div>
          {/*  */}
        </div>
        <div className="part2">
          <img src={bgimg} alt="Logo" className="bgimg" />;
          <div className="btns">
            <button
              className="btn btn-outline-primary rounded-pill text-dark fw-bold px-5 fs-5 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              Login
            </button>
            <button
              className="btn btn-outline-primary rounded-pill text-dark fw-bold px-5 fs-5 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#signup"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      {/* contact page */}
      <div className="contact">
        <div>
          <h2>HOW CAN WE HELP?</h2>
        </div>
        <div
          className="card px-3 pt-3"
          style={{ width: "35rem", marginBottom: "10vh", marginTop: "2vh" }}
        >
          <form onSubmit={contactdata}>
            <div className="d-flex justify-content-between">
              <h5 style={{ paddingBottom: "5vh" }}>
                Getting in touch to discuss:{" "}
              </h5>
              <select
                className="form-select"
                name="uselect"
                style={{
                  width: "10rem",
                  height: "3rem",
                  marginTop: "-7px",
                  marginLeft: "5px"
                }}
              >
                <option selected value="Send a query">
                  Send a query
                </option>
                <option value="Discuss features">Discuss features</option>
                <option value="Sending suggestions">Sending suggestions</option>
                <option value="SEO discussion">SEO discussion</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Full-Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Steven Smith"
                name="uname"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="uemail"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Elaborate your concern
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="umsg"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone No.
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="uno"
              />
            </div>
            <button
              id="contactForm"
              type="submit"
              className="btn btn-border-none btn-danger px-5 mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Registration Modal */}
      <div
        className="modal fade"
        id="signup"
        tabIndex="-1"
        aria-labelledby="signupLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signupLabel">
                User Registration Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/*  */}
              <form action="#" method="POST" onSubmit={registrationdata}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Full-Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Steven Smith"
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="*******"
                    name="password"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="*******"
                    name="cpassword"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal */}
      <div
        className="modal fade"
        id="login"
        tabIndex="-1"
        aria-labelledby="loginLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginLabel">
                User Login Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="#" method="POST" onSubmit={logindata}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="*******"
                    name="password"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary closeNavigate"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
