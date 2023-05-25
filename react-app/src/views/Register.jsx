import { useContext, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import UserContext from "../context/ContextProvider";

export default function Register() {
  const { token, setUser, setAccessToken } = useContext(UserContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  if (token) {
    return <Navigate to="/" />;
  }

  async function registerHandler(evt) {
    evt.preventDefault();
    const payloads = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    try {
      const { user, token } = (await axiosClient.post("/signup", payloads))
        .data;
      setUser(user);
      setAccessToken(token);

      [nameRef, emailRef, passwordRef, passwordConfirmationRef].forEach(
        (field) => (field.current.value = "")
      );
    } catch (error) {
      if (error.response?.status === 422) {
        console.log(error.response.data.error);
      }
    }
  }

  return (
    <div className="Register">
      <form onSubmit={registerHandler}>
        <input ref={nameRef} type="text" placeholder="Full Name" />
        <input ref={emailRef} type="email" placeholder="Email Address" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={passwordConfirmationRef}
          type="password"
          placeholder="Confirm Password"
        />
        <button>Sign Up</button>
        <p className="message">
          Already Registered? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
