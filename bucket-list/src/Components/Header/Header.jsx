import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link class="header__link" to="/"><h1 className="header__heading">BucketList</h1></Link>
    </div>
  );
};

export default Header;
