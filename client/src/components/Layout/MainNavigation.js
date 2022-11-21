import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import { useContext } from "react";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>BPQ331</div>
      </Link>
      <nav>
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="communication">
            <Link to="/Communication">Communication</Link>
          </li>
          <li key="rubric">
            <Link to="/Rubric">Rubric</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
