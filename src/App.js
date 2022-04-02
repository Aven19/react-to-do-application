import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import PageNotFound from "./components/pagenotfound";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App({ db }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userDetails = {
        uid: user?.uid,
        email: user?.email,
      };
      if (user) {
        setUser(userDetails);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <Router>
      <div className="App">
        <>
          <Routes>
            <Route
              path="/login"
              element={
                <SignIn/>
              }
            />
            <Route
              path="/register"
              element={
                <SignUp/>
              }
            />
            <Route path="/" element={<Home db={db}/>} />
            <Route path="/*" element={<PageNotFound/>} />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
