import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Col, Row, Card, CardTitle } from "reactstrap";
import { useUserAuth } from "../../firebase/Auth/UserAuthContex";
import Input from "../Input/Input";
import "./Auth.css";
// import PastaImg from "../assets/imgs/pasta.jpg";
import BtnStyles from "../styles/Button.css";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp, signInAnon } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Welcome - Create an account</h2>
      <form onSubmit={handleSubmit} className="auth-form auth-form-signup">
        <Input
          type="text"
          label="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="email"
          label="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="password"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="btn">
          Sign up
        </button>
        <div className="auth-form-alt-options">
          <div>
            Already have an account?
            <Link to="/login">Log-in to your account</Link>
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

export default RegisterForm;
