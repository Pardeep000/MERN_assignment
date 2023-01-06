import React from "react";
import { Link } from "react-router-dom";
//
export default function HomeNavbar() {
  // const navigate = useNavigate();
  return (
    <>
      <header class="p-3 text-dark bg-primary fixed-top">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* imgLogo */}
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/home" class="nav-link px-2 text-white">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  Network
                </a>
              </li>
              <li>
                <Link to="/updateuser" class="nav-link px-2 text-white">
                  Edit_Account
                </Link>
              </li>
              <li>
                <Link to="/todolist" class="nav-link px-2 text-white">
                  Todo_List
                </Link>
              </li>
              <li>
                <a href="#" class="nav-link px-2 text-white">
                  About
                </a>
              </li>
            </ul>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input
                type="search"
                class="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div class="text-end">
              <button type="button" class="btn btn-outline-light me-2">
                Search
              </button>
              {/* <button
                type="button"
                class="btn btn-warning"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  console.log("logging out");
                }}
              >
                Log-Out
              </button> */}
              {/*  */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
