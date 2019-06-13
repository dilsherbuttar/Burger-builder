import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

function navigationItems() {
    return (
        <ul className = {classes.NavigationItems}>
           <NavigationItem link = "/" active>Burger Builder</NavigationItem>
           <NavigationItem link = "/">Checkout</NavigationItem>
           <NavigationItem></NavigationItem>
        </ul>
    )
}

export default navigationItems