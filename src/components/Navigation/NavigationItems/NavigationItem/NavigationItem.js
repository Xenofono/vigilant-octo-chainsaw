import React from "react";
import PropTypes from "prop-types";
import classes from "./NavigationItem.module.css";
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link} exact 
      activeStyle={{
        backgroundColor:'#8F5C2C',
            borderBottom: '4px solid #40A4C8',
            color: 'white'
    }}>{props.children}</NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
    link: PropTypes.string.isRequired,
};

export default NavigationItem;
