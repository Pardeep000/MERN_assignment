import React from "react";
//
import Background from "./component/Background";
import Foreground from "./component/Foreground";
import Home from "./component/Home";
import TodoList from "./component/TodoList";
import UpdateUser from "./component/UpdateUser";
import "./styles/root.css";
//
import CloudComponent from "./component/CloudComponent";
//
import { BrowserRouter, Routes, Route } from "react-router-dom";
//
export default function App() {
  return (
    <>
      <div className="mainContainer">
        <BrowserRouter>
          <Background />
          <Routes>
            <Route path="/" element={<Foreground />} />
            <Route path="/home" element={<Home />} />
            <Route path="/updateuser" element={<UpdateUser />} />
            <Route path="/todolist" element={<TodoList />} />
            <Route path="/cloud" element={<CloudComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
