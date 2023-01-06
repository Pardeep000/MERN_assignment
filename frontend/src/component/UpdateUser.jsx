import React, { useState, useEffect } from "react";
//
import HomeNavbar from "./HomeNavbar";
import UnAuthorized from "./UnAuthorized";
//
import person from "../media/person.webp";
//
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../state/reducer/userReducer";
import { clearUmsg } from "../state/reducer/userReducer";
//

import "../styles/UpdateUser.css";
export default function UpdateUser() {
  let userstatus = useSelector((e) => e.userdata);
  const dispatch = useDispatch();
  //
  const [image, setImage] = useState("");
  const [imageonMount, setImageonMount] = useState("");
  let handleImage = (e) => {
    e.preventDefault();
    console.log("uploading image...");
    //
    const formdata = new FormData(e.target);
    // setImage(formdata.get("img"));
    //
    console.log("formdata", formdata);
    let url = "https://lywmqv.sse.codesandbox.io/img";
    // //
    fetch(url, {
      method: "POST",
      body: formdata,
      headers: {
        authtoken: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    //
  };
  //
  let updateData = (e) => {
    e.preventDefault();
    console.log("Update submitted...");
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray", dataArray);
    dispatch(updateUser(dataArray));
    // e.target.reset();
  };

  useEffect((e) => {
    console.log("userstatus.UPDATEmsg from useEffect", userstatus.updatemsg);
    console.log(
      "localStorageToken from useEffect",
      localStorage.getItem("token")
    );
    if (userstatus.updatemsg !== "") {
      alert(`${userstatus.updatemsg}`);
      dispatch(clearUmsg());
    }
    //
  });

  //

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
        console.log("updating_resp=>", resp);
        // console.log("resp2=>", resp[0].img.data.data);
        let convertedbase64 = _arrayBufferToBase64(resp[0].img.data.data);
        // console.log("buffer=>", convertedbase64);
        setImageonMount(convertedbase64);
        //
      })
      .catch((e) => console.log("error in reading image", e));
    //
  };
  //useEffect for reading
  useEffect((e) => {
    if (localStorage.getItem("token") !== null) {
      read();
      console.log("reading image");
    }
  }, []);
  return localStorage.getItem("token") !== null ? (
    <>
      <HomeNavbar />
      <div className="updateContainer">
        <div className="imgupdatePart">
          {/* <img src={image === "" ? person : URL.createObjectURL(image)} /> */}
          {imageonMount === "" ? (
            <img src={image === "" ? person : URL.createObjectURL(image)} />
          ) : (
            <img src={`data:image/png;base64,${imageonMount}`} alt="" />
          )}
          <form onSubmit={handleImage}>
            <input
              type="file"
              name="img"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageonMount("");
              }}
            />
            <button>Save Image</button>
          </form>
        </div>
        <div className="infoupdatePart">
          <form action="#" method="POST" onSubmit={updateData}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
              <label htmlFor="exampleFormControlInput1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="*******"
                name="npassword"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="*******"
                name="opassword"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <UnAuthorized />
  );
}
