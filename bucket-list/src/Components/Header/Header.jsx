import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
  import logo from "../../images/logo.png";
const Header = () => {
  return (
    <div className="header">
      <Link class="header__link" to="/">
        <img src={logo} className="header__logo" alt ="logo" />
      </Link>
    </div>
  );
};
export default Header;
