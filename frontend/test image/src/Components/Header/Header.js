import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        STUDENT
      </NavLink>
      {" | "}
      <NavLink to="/login/teacher" activeStyle={activeStyle} exact>
        TEACHER
      </NavLink>
    </nav>
  );
};

export default Header;
