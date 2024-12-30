import React, { useEffect, useState } from "react";
import { auth, provider } from "./config.js";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";

function SignIn({ onSignIn }) {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        onSignIn(); // Notify the parent component
        setLoading(false); // Reset loading state
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Reset loading state
      });
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        setValue(userEmail);
        localStorage.setItem("email", userEmail);
        onSignIn(); // Notify the parent component
        setLoading(false); // Reset loading state
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Reset loading state
      });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue(storedEmail);
      onSignIn();
    }
  }, [onSignIn]);

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Email and Password Sign In */}
        <form onSubmit={handleEmailSignIn}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
          <button
            type="submit"
            className="email-signin-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        <div className="divider">or</div>

        {/* Google Sign In */}
        <button
          className="google-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          aria-label="Sign in with Google"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default SignIn;
