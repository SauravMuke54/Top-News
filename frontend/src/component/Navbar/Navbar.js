import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../helper/index'
import {signout} from '../../helper/signout'
export default function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Top News</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                            Top News
                        </h5>
                        <button
                            type="button"
                            class="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <Link
                                    class="nav-link active"
                                    aria-current="page"
                                    to="/"
                                    ><b>Home</b></Link
                                >
                            </li>
                            <hr/>
                            <li class="nav-item">
                                <Link
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/"
                                    ><b>About Us</b></Link
                                >
                            </li>
                            <hr/>
                           {!isAuthenticated() && <><li class="nav-item">
                                <Link
                                    class="nav-link active"
                                    aria-current="page"
                                    to="/signin"
                                    ><b>Login / Signup</b></Link
                                >
                            </li>
                            <hr/></>}
                            {isAuthenticated() && <><li class="nav-item">
                                <Link
                                    class="nav-link active"
                                    aria-current="page"
                                   onClick={e=>signout()}
                                    ><b>Logout</b></Link
                                >
                            </li>
                            <hr/></>}
                        </ul>
                        
                    </div>
                </div>
            </div>
        </nav>
        
    </div>
  )
}
