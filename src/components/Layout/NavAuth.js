import { useNavigate, Link, NavLink } from "react-router-dom";
import { useUserAuth } from "../../firebase/Auth/UserAuthContex";

export const NavAuth = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!user ? (
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive ? "navlink navlink-login navlink--active" : "navlink"
          }
        >
          Login
        </NavLink>
      ) : (
        <button
          variant="primary"
          onClick={handleLogout}
          className="nav-logout-btn"
        >
          Log out
        </button>
      )}
    </>
  );
};
