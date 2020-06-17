import Header from "./Header";
import Footer from "./Footer";
import React, { useContext, createContext } from "react";

const themeContext = createContext("white");

const Layout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div>
        <div className="">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
