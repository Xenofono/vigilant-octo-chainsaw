import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{height:props.height}}>
      <img src={burgerLogo} alt="hamburger logo"></img>
    </div>
  );
};

export default Logo;
