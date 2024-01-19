import { Link } from "react-router-dom";
import Style from "./signIn.module.css";
import { useState, useRef, useEffect } from "react";
import { auth } from "../../firebaseInIt";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";


export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect on

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/";
      }
    });

    return () => unsubscribe(); // Make sure to return the unsubscribe function
  }, []); // Include auth in the dependency array
  // // submit handle

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful, redirect to home page
      toast.success("You are now Signed In!");
      window.location.href = "/";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(error);
      clearValues();
      console.error("Error signing in:", errorCode, errorMessage);
    }
    setLoading(false);
  };

  function clearValues() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }
  return (
    <>
      <div className={Style.form}>
        <h1>
          Sign In          <img
            src="../../images/login-icon.png"
            className={Style.cart}
            alt="Namaste"
          />
        </h1>
        <form onSubmit={handleSignInSubmit}>
          {error ? (
            <p style={{ color: "red", margin: "auto" }}>{error.message}</p>
          ) : null}
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            autoComplete="email"
          />{" "}
          <br />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="current-password"
          />
          <br />
          <button type="submit">{loading ? "Loading..." : "Sign In"}</button>
          <Link to="/signup">Create a new Account</Link>
        </form>
      </div>
    </>
  );
}