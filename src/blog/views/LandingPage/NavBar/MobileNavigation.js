import classes from "./Navbar.module.css";
import NavLinks from "./NavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";

const MobileNavigation = () => {
  const [open, setOpen] = React.useState(false);

  const hamburgerIcon = (
    <AiOutlineMenu className={classes.Hamburger} size="25px" color="#303031" onClick={() => setOpen(!open)} />
  );
  const closeIcon = (
    <AiOutlineClose className={classes.Hamburger} size="25px" color="#303031" onClick={() => setOpen(!open)} />
  );
  return <nav className={classes.MobileNavigation}>
		{open? closeIcon:hamburgerIcon}
		{open && <NavLinks />}</nav>;
};

export default MobileNavigation;
