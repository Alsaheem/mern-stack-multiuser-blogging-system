import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../actions/auth";
import Router from "next/router";

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      Router.push("/signin");
    }
  }, []);
  return <div>{children}</div>;
};

export default Private;
