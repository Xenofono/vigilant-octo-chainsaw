import React from 'react'
import PropTypes from 'prop-types'
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

MenuButton.propTypes = {

}

export default MenuButton
