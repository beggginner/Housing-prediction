import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Navbar'
import Main from './pages/Main';
import Predit from './pages/Predict';
import About from './pages/About';
import Sell from './pages/Sell';
import fire from './fire'
import Login from './pages/login'
import Loader from 'react-loader-spinner';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
        }
      });
  };

  function handleLogOut() {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      clearInputs();
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      <Router>
        {
          user ? (
            <Layout>
              <Switch>
                <Route exact path="/HomeSweetHomeClient">
                  <Main />
                </Route>
                <Route path="/HomeSweetHomeClient/predict">
                  <Predit />
                </Route>
                <Route path="/HomeSweetHomeClient/about">
                  <About />
                </Route>
                <Route path="/HomeSweetHomeClient/sell">
                  <Sell />
                </Route>
              </Switch>
            </Layout>
          ) : user === '' ? (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
          ) : (
            <>
              <div
                style={{
                  // width: "100%",
                  // height: "100%",
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: 'auto'
                  }}
                >
                  <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                </div>
              </div>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
