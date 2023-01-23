import { NavLink } from "react-router-dom";
import { pages } from "../../App";
import { NavAuth } from "./NavAuth";

export function Nav() {
  return (
    <>
      <header>
        <nav>
          <h1>Mazanowski Recipe Book</h1>
          <ul className="nav">
            {pages.map((page, index) => (
              <li key={index} className="navlink-li">
                <NavLink
                  to={page.to}
                  className={({ isActive }) =>
                    isActive ? "navlink navlink--active" : "navlink"
                  }
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
            <li className="navlink-li">
              <NavAuth />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
