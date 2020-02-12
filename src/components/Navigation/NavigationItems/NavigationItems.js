import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burgarbyggaren</NavigationItem>
            <NavigationItem link="/">Bekräfta köp</NavigationItem>
        </ul>
    )
}

NavigationItems.propTypes = {

}

export default NavigationItems
