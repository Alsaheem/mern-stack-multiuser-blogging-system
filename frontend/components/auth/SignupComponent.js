import React, { useState ,useEffect} from "react";
import { signup,isAuthenticated } from "../../actions/auth";
import Link from "next/link";
import Router from "next/router";


const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    isAuthenticated()  && Router.push("/")
  },[])

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{errorMessage}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const signupForm = () => {
    return (
      <div className="container">
        <br />
        <h2 className="text-center">Sign Up</h2>
        <br />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <article className="card-body rounded ">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <small className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Create password</label>
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
                      Signup
                    </button>
                  </div>
                  <small className="text-muted">
                    By clicking the 'Sign Up' button, you confirm that you
                    accept our <br /> Terms of use and Privacy Policy.
                  </small>
                </form>
              </article>
              <div className="border-top card-body text-center">
                Have an account?
                <Link href="/signin" >Sign in </Link>
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
    const user = { name, email, password };
    signup(user)
      .then((response) => {
        console.log(`response`, response.data);
        if (response.error) {
          setErrorMessage(response.error.error);
          setLoading(false);
          setError(true);
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setErrorMessage("");
          setMessage(response.data.message);
          setError(false);
          setLoading(false);
          setShowForm(false);
        }
      })
  };

  return (
    <div>
      <div className="">
        {error && showError()} {showLoading()} {showMessage()}
        {showForm && signupForm()}
      </div>
    </div>
  );
};

export default SignupComponent;
