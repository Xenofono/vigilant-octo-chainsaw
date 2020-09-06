import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from '../SideDrawer/MenuButton/MenuButton'

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <MenuButton sideDrawerHandler={props.sideDrawerHandler}></MenuButton>
      <div className={classes.Logo}>
        <Logo></Logo>
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated}></NavigationItems>
      </nav>
    </header>
  );
};

export default Toolbar;
