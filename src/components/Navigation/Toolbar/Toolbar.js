import React from "react";
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const Toolbar = (props) => {

   return <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo></Logo>
        <nav>
            ...
        </nav>
    </header>
};

export default Toolbar;
