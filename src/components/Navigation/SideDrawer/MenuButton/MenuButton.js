import React from 'react'
import classes from './MenuButton.module.css'

const MenuButton = props => {
    return (
        <div onClick={props.sideDrawerHandler} className={classes.MenuButton}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}


export default MenuButton
