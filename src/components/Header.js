import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { pages } from "../App";
import "./styles/Nav.css";
function Header(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar {...args} className="navbar-expand-md container-fluid">
      <NavbarBrand href="/">Mazanowski Recipe Book</NavbarBrand>
      <NavbarToggler onClick={toggle} className="me-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {pages.map((page, index) => (
            <NavItem key={index} className="navlink-li">
              <NavLink
                to={page.to}
                className={({ isActive }) =>
                  isActive ? "navlink navlink--active" : "navlink"
                }
              >
                {page.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
