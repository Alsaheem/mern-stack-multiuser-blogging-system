import React, { useState, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";

const SigninComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    isAuthenticated() && Router.push("/");
  }, []);

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{errorMessage}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const signinForm = () => {
    return (
      <div className="container">
        <br />
        <h2 className="text-center">Sign In</h2>
        <br />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <article className="card-body rounded ">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label>password</label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Signin
                    </button>
                  </div>
                </form>
              </article>
              <div className="border-top card-body text-center">
                dont Have an account?
                <Link
                  href="/signup"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handling the submissionn`);
    setLoading(true);
    const user = { email, password };
    signin(user).then((response) => {
      console.log(`response`, response);
      if (response.error) {
        setErrorMessage(response.error.error);
        setLoading(false);
        setError(true);
      } else {
        let { token, user, message } = response.data;
        //authenticate user
        authenticate(response.data, () => {
          if (isAuthenticated() && isAuthenticated().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="">
        {showError()} {showLoading()} {showMessage()}
        {showForm && signinForm()}
      </div>
    </div>
  );
};

export default SigninComponent;
