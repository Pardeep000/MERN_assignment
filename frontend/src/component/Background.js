import React from "react";
import bgvideo from "../media/bgvideo.mp4";
//
import "../styles/background.css";

export default function Background() {
  return (
    // <video autoplay loop muted>
    <video autoPlay loop muted>
      <source src={bgvideo} type="video/mp4" />
    </video>
  );
}
