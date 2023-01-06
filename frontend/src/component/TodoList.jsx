import React, { useEffect, useState } from "react";
//
import "../styles/todolist.css";
//
import HomeNavbar from "./HomeNavbar";
import UnAuthorized from "./UnAuthorized";
//
import person from "../media/person.webp";
//
import { useSelector, useDispatch } from "react-redux";
import {
  createTask,
  readTask,
  updateTask,
  deleteTask
} from "../state/reducer/todoReducer";
//
import { useNavigate } from "react-router-dom";
//
export default function TodoList() {
  //
  const navigate = useNavigate();
  //
  const dispatch = useDispatch();
  //
  const todo = useSelector((state) => state.tododata);
  const user = useSelector((state) => state.userdata);
  //for updating work
  const [updateId, setupdateId] = useState(0);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  //
  const [image, setImage] = useState("");
  //
  let addTask = async (e) => {
    e.preventDefault();
    console.log("addTask clicked...");
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray of task", dataArray);
    //
    dispatch(createTask(dataArray));
    e.target.reset();
  };
  //
  let updatedT = (e) => {
    e.preventDefault();
    console.log("updateTask clicked...");
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray of task", dataArray);
    //
    let obj = {
      data: dataArray,
      Id: updateId
    };
    //
    dispatch(updateTask(obj));
    e.target.reset();
  };
  //For reading the image
  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  //
  let read = () => {
    console.log("reading...");
    fetch("https://lywmqv.sse.codesandbox.io/readimg", {
      method: "GET",
      headers: {
        authtoken: localStorage.getItem("token")
      }
    })
      .then((a) => a.json())
      .then(async (resp) => {
        console.log("Image_resp=>", resp);
        // console.log("resp2=>", resp[0].img.data.data);
        let convertedbase64 = _arrayBufferToBase64(resp[0].img.data.data);
        // console.log("buffer=>", convertedbase64);
        setImage(convertedbase64);
        //
      })
      .catch((e) => console.log("error in reading image", e));
    //
  };
  //
  useEffect((e) => {
    if (localStorage.getItem("token") !== null) {
      dispatch(readTask());
      read();
    }
    console.log("user.ownerInfo", user.ownerInfo);
  }, []);

  //
  return localStorage.getItem("token") !== null ? (
    <>
      <HomeNavbar />
      {/* {user.ownerInfo.name} */}
      <div className="homeContainer">
        <div className="leftPart">
          <div className="imgPart">
            {/* <img src={person} alt="person" /> */}
            {/* <img src={`data:image/png;base64,${image}`} alt="" /> */}
            {image === "" ? (
              <img src={person} alt="person" />
            ) : (
              <img src={`data:image/png;base64,${image}`} alt="" />
            )}
          </div>
          <div className="infoPart">
            <div className="innerPart">
              <p className="infoText">
                {/* <span>Name:</span> Steven Smith */}
                <span>Name:</span> {user.ownerInfo.name}
              </p>
              <p className="infoText">
                {/* <span>Email-Address:</span> smith@gmail.com */}
                <span>Email-Address:</span> {user.ownerInfo.email}
              </p>
              <p className="infoText">
                {/* <span>Last login:</span> 2015/3/16 */}
                <span>Last login:</span> {user.ownerInfo.loginAt}
              </p>
              <p className="infoText">
                {/* <span>Created Account:</span> 2015/3/16 */}
                <span>Created Account:</span> {user.ownerInfo.createAt}
              </p>
              {/* logoutbutton */}
              <div className="logoutbtn">
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                    console.log("logging out");
                  }}
                >
                  Log-Out
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="rightPart">
          <h3 className="text-dark">Create a Todo List...</h3>
          <form method="POST" action="#" onSubmit={addTask}>
            <div className="">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                <span style={{ fontWeight: "bold" }}>Title</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Write your title"
                name="title"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                <span style={{ fontWeight: "bold" }}>Description</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                placeholder="Elaborate your task to be done..."
                rows="3"
                name="description"
              ></textarea>
            </div>
            <button
              className="btn border rounded-pill btn-primary"
              type="submit"
            >
              Add-a-task
            </button>
          </form>
          {/*  */}
          <hr />
          {/*  */}
          {todo.status === "succeeded"
            ? // ? todoInitialdata.map((e, index) => {
              todo.taskArray.map((e, index) => {
                return (
                  <div className="todoContainer" key={e._id}>
                    <div className="title">
                      <p>
                        <span>Title:</span>
                        {e.title}
                      </p>
                      <span className="index">{index + 1}</span>
                    </div>
                    <p className="date">{e.date}</p>
                    <p className="description">{e.description}</p>
                    <div className="buttons">
                      {/* update button */}
                      <button
                        className="mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#updateNote"
                        onClick={() => {
                          setupdateId(e._id);
                          settitle(e.title);
                          setdescription(e.description);
                          //
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      {/* delete button */}
                      <button
                        className="mx-1"
                        onClick={async () => dispatch(deleteTask(e._id))}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            : todo.status}
          {/*  */}
        </div>
      </div>
      {/* update Modal */}
      <div
        className="modal fade"
        id="updateNote"
        tabIndex="-1"
        aria-labelledby="loginLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginLabel">
                Update your Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="#" method="POST" onSubmit={updatedT}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Write your title"
                    //
                    value={title}
                    name="title"
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    //
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Elaborate your task to be done..."
                    rows="3"
                    //
                    value={description}
                    name="description"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    //
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <UnAuthorized />
  );
}
