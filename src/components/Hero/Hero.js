import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export const HeroLoggedOut = ({ page }) => (
  <div className=" hero">
    <div className="hero-text">
      {page === "home" ? <h1>Welcome!</h1> : page}
      <p>
        Please head to the sign in page to view/add recipes. You can choose
        "sign in anonymously" if you dont want to create an account.
      </p>
      <div className="btns">
        <Link to="/register" className="btn">
          Register
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </div>
  </div>
);
export const Hero = () => {
  const user = auth.currentUser;
  const username = user !== null ? user.displayName : "";
  return (
    <div className=" hero hero-loggedin">
      <div className="hero-text">
        <h1>Welcome {user !== null && user.displayName} !</h1>
      </div>
    </div>
  );
};
