import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../firebase/Auth/UserAuthContex";

import Input from "../Input/Input";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, signInAnon, user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      console.log("welcome back", user.displayName);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
    navigate("/");
  };
  return (
    <>
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit} className="auth-form auth-form-login">
        <Input
          type="email"
          label="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Log In
        </button>
        <div className="auth-form-alt-options">
          <div>
            Need an account?{" "}
            <Link to="/register" className="sign-in-as-guest">
              Create an account
            </Link>
          </div>

          <div>
            Stay anonymous:
            <button
              type="button"
              onClick={signInAnon}
              className="sign-in-as-guest"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
