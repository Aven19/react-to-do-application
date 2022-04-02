import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const auth = getAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const emailRef = useRef(null);
  // const passwordRef = useRef(null);
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailAddress, password
      // emailRef.current.value,
      // passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailAddress, password
      // emailRef.current.value,
      // passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setEmailAddress("");
        setPassword("");
        setError(error.message);
        // ..
      });
  };
  return (
    <div>
      <section
        className="h-100 gradient-form gradient-custom"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://i.pinimg.com/564x/b6/cd/e8/b6cde81d1c489b0e20d85a6e06c5f8f9.jpg"
                          style={{ width: "100px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-3 pb-1">
                          React to-do Application
                        </h4>
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        {error && <div className="alert alert-danger" role="alert">
                        {error}
                        </div>}
                        <div className="form-outline mb-3">
                          <input
                            // ref={emailRef}
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                            type="email"
                            id=""
                            className="form-control"
                            placeholder="Email address"
                          />
                          <label className="form-label" htmlFor="">
                            Email
                          </label>
                        </div>
                        <div className="form-outline mb-3">
                          <input
                            // ref={passwordRef}
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            type="password"
                            id=""
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="">
                            Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-3 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={signIn}
                          >
                            Log in
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            onClick={signUp}
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
