import React, { useEffect, useState } from "react";
//
import "../styles/home.css";
//
import HomeNavbar from "./HomeNavbar";
import UnAuthorized from "./UnAuthorized";
//
import person from "../media/person.webp";
//
import { useSelector, useDispatch } from "react-redux";
import { createPost, readPost } from "../state/reducer/postReducer";
import { clearPmsg } from "../state/reducer/postReducer";
//
import { useNavigate } from "react-router-dom";
//
export default function Home() {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const post = useSelector((state) => state.postdata);
  const user = useSelector((state) => state.userdata);
  //
  const [image, setImage] = useState("");
  //
  let handlePost = async (e) => {
    e.preventDefault();
    console.log("Posting to timeline...");
    let dataArray = {};
    const formdata = new FormData(e.target);
    for (let [key, value] of formdata.entries()) {
      dataArray[key] = value;
    }
    console.log("dataArray of task", dataArray);
    dispatch(createPost(dataArray));
    // e.target.reset();
  };
  //
  //For reading the image
  let readingImage = () => {
    console.log("reading...");
    fetch("https://lywmqv.sse.codesandbox.io/readImg", {
      method: "GET",
      headers: {
        authtoken: localStorage.getItem("token")
      }
    })
      .then((a) => a.json())
      .then(async (resp) => {
        console.log("Image-resp", resp);
        setImage(resp);
      })
      .catch((e) => console.log("error in reading image", e));
    //
  };
  //
  useEffect((e) => {
    if (post.postmsg !== "") {
      if (post.postmsg !== "Post has been added.") alert(`${post.postmsg}`);
      dispatch(clearPmsg());
    }
    console.log("post.readPostArray", post.readPostArray);
  });

  //for one time
  useEffect((e) => {
    if (localStorage.getItem("token") !== null) {
      dispatch(readPost());
      readingImage();
    }
    console.log("user.ownerInfo", user.ownerInfo);
  }, []);

  //
  return localStorage.getItem("token") !== null ? (
    <>
      <HomeNavbar />
      <div className="phomeContainer">
        <div className="pleftPart">
          <div className="pimgPart">
            {/* initially image will be empty so set person then runs other condition */}
            {image === "" ? (
              <img src={person} alt="" />
            ) : (
              <img src={image === null ? person : image} alt="" />
            )}
          </div>
          <div className="pinfoPart">
            <div className="pinnerPart">
              <p className="pinfoText">
                <span>Name:</span> {user.ownerInfo.name}
              </p>
              <p className="pinfoText">
                <span>Email-Address:</span> {user.ownerInfo.email}
              </p>
              <p className="pinfoText">
                <span>Last login:</span> {user.ownerInfo.loginAt}
              </p>
              <p className="pinfoText">
                <span>Created Account:</span> {user.ownerInfo.createAt}
              </p>
              {/* logoutbutton */}
              <div className="plogoutbtn">
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
        <div className="prightPart">
          <h3 className="text-dark">What are you upto? Let's World know...</h3>
          <form method="POST" action="#" onSubmit={handlePost}>
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
            <div className="d-flex">
              <select
                className="form-select"
                name="topic"
                style={{
                  width: "10rem",
                  height: "3rem",
                  marginTop: "-7px",
                  marginLeft: "5px"
                }}
              >
                <option selected value="Select a Topic">
                  Select a Topic
                </option>
                <option value="Discuss features">Discuss features</option>
                <option value="Class activities">Class activities</option>
                <option value="Daily lives">Daily lives</option>
                <option value="Others">Others</option>
              </select>
              <button className="psubmitbtn" type="submit">
                Post to Timeline
              </button>
            </div>
            {/*  */}

            {/*  */}
          </form>
          {/*  */}
          <hr />
          {/* posts display area */}
          {post.readPostStatus === "succeeded"
            ? post.readPostArray.map((e, index) => {
                return (
                  <div className="postContainer" key={e._id}>
                    {/*  */}
                    <div className="topbar">
                      <div className="ownerImg">
                        {e.id.imgUrl === null ? (
                          <img src={person} alt="person" />
                        ) : (
                          <img src={e.id.imgUrl} alt="" />
                        )}
                      </div>
                      <div className="ownerdata">
                        <div className="postowner">
                          <p>
                            <span>By:</span>
                            {e.id.name}
                          </p>
                          <span className="postindex">{index + 1}</span>
                        </div>
                        {/*  */}
                        <div className="posttitle">
                          <p>
                            <span>Title:</span>
                            {e.title}
                          </p>
                          <p className="postindex">
                            <span>Topic:</span>
                            {e.topic}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <p className="postdate">{e.date}</p>
                    <p className="postdescription">{e.description}</p>
                  </div>
                );
              })
            : post.readPostStatus}
          {/*  */}
        </div>
      </div>
    </>
  ) : (
    <UnAuthorized />
  );
}

// {
//   todo.readPostStatus === "succeeded"
//     ? todo.readPostArray.map((e, index) => {
//         return (
//           <div className="postContainer" key={e._id}>
//             <div className="posttitle">
//               <p>
//                 <span>Title:</span>
//                 {e.title}
//               </p>
//               <span className="postindex">{index + 1}</span>
//             </div>
//             <p className="postdate">{e.date}</p>
//             <p className="postdescription">{e.description}</p>
//           </div>
//         );
//       })
//     : todo.status;
// }
