import React from "react";
import { Navigate } from "react-router-dom";
import {isAuthenticated} from './index'


const PrivateRoute = ({ children, ...rest }) => {
  return (
    <div>{isAuthenticated() ? children : <Navigate to="/userdashboard" />}</div>
  );
};

export default PrivateRoute;