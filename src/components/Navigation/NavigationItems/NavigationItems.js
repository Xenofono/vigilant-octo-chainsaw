import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burgarbyggaren</NavigationItem>
      
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Beställningar</NavigationItem>
      ) : null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout">Logga ut</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Registera eller logga in</NavigationItem>
      )}
    </ul>
  );
};

NavigationItems.propTypes = {};

export default NavigationItems;
