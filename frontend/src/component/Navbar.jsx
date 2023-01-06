import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed-top">
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom px-5 pt-3">
        <a className="d-flex align-items-center text-dark text-decoration-none">
          <span className="fs-4 text-dark fw-bold">Local Forum Site</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link
            className="me-3 py-2 text-dark fw-bold text-decoration-none"
            to="/"
          >
            Home
          </Link>
          <a
            className="me-3 py-2 text-dark fw-bold text-decoration-none"
            href="#"
          >
            About
          </a>
          {/* dropdown features */}
          <div
            className="dropdown mt-2 mx-2 me-3"
            style={{ cursor: "pointer" }}
          >
            <a
              className="text-dark fw-bold dropdown-toggle list-unstyled"
              data-bs-toggle="dropdown"
            >
              Features
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item">Link 1</a>
              </li>
              <li>
                <a className="dropdown-item">Link 2</a>
              </li>
              <li>
                <a className="dropdown-item">Link 3</a>
              </li>
            </ul>
          </div>
          <a
            className="py-2 text-dark fw-bold text-decoration-none"
            href="#contactForm"
          >
            Contact-Us
          </a>
        </nav>
      </div>
    </div>
  );
}
