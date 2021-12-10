import classes from "./Navbar.module.css"
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const NavBar = () =>{
    return(
        <nav className={classes.NavBar}>
            <MobileNavigation/>
            <Navigation/>
        </nav>
    );
}

export default NavBar;