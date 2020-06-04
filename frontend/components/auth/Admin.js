import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../actions/auth";
import Router from "next/router";

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      Router.push("/signin");
    } else if (isAuthenticated().role !== 1) {
      Router.push("/user");
    }
  }, []);
  return <div>{children}</div>;
};

export default Admin;
