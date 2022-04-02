import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App({ db }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userDetails = {
        uid: user?.uid,
        email: user?.email
      }
      if (user) {
        setUser(userDetails);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      {user ? <Home  db={db}/> : <SignIn />}
      {/* <Home db={db}/> */}
    </div>
  );
}

export default App;
