import { Link } from "react-router-dom";

export default function Login() {
  function loginHandler(evt) {
    evt.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={loginHandler}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <p className="message">
          Not Registered? <Link to="/register">Create Account</Link>
        </p>
      </form>
    </div>
  );
}
