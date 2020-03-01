import React, {useState} from "react";
import PropTypes from "prop-types";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = props => {

  const attachedClasses = [classes.SideDrawer, classes.Close]

  if(props.open){
    attachedClasses[1] = classes.Open
  }

  return (
    <React.Fragment>
    <Backdrop show={props.open} clicked={props.close}></Backdrop>
    <div className={attachedClasses.join(" ")}>
      <div className={classes.Logo}>
        <Logo ></Logo>
      </div>

      <nav>
        <NavigationItems></NavigationItems>
      </nav>
    </div>
    </React.Fragment>

  );
};

SideDrawer.propTypes = {};

export default SideDrawer;