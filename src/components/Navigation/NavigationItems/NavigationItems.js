import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burgarbyggaren</NavigationItem>
            <NavigationItem link="/orders">Beställningar</NavigationItem>
        </ul>
    )
}

NavigationItems.propTypes = {

}

export default NavigationItems
