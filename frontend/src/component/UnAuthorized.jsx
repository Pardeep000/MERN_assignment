import React from "react";
//
import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
  const navigate = useNavigate();
  let obj = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%"
  };
  return (
    <>
      <div style={obj}>
        <h5>Un-Authorized Visit to Screen</h5>
        <button
          onClick={() => {
            navigate("/");
            console.log("loggin out");
          }}
        >
          go back
        </button>
      </div>
    </>
  );
}
