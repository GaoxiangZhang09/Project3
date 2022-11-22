import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>NFT-</div>
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

MainNavigation.propTypes = {};
export default MainNavigation;
