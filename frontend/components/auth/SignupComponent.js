import React, { useState } from "react";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handling the submissionn`);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
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
                      onChange={handleChange}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                <a className="btn btn-outline-primary mt-1 ml-2">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
