import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Router from "next/router";
import ".././node_modules/nprogress/nprogress.css"; //styles of nprogress
import NProgress from "nprogress";
import { signout, isAuthenticated } from "../actions/auth";


//npm inbuilt router functionns
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold" style={{ cursor: "pointer" }}>
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated() && (
              <>
                <NavItem>
                  <Link href="/signup">
                    <NavLink className="btn btn-info btn-sm  text-white">
                      {" "}
                      Signup
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signin">
                    <NavLink className="ml-3 btn btn-success btn-sm  text-white">
                      {" "}
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink className="btn btn-secondary text-capitalize btn-sm text-white">
                    {`${isAuthenticated().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink className="btn text-capitalize btn-secondary btn-sm text-white">
                    {`${isAuthenticated().name}'s Dashboard`}
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuthenticated() && (
              <NavItem>
                <NavLink
                  className="btn btn-danger btn-sm text-white ml-3"
                  onClick={() => signout(() => Router.replace("/signin"))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
