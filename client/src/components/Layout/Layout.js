import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

function Layout(props) {
  console.log(`Fuck you John, John, John ${props.children}`)
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
export default Layout;
