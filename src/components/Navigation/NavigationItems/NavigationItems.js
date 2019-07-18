import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

function navigationItems() {
    return (
        <ul className = {classes.NavigationItems}>
           <NavigationItem link = "/" >Burger Builder</NavigationItem>
           <NavigationItem link = "/orders">Orders</NavigationItem>
           <NavigationItem></NavigationItem>
        </ul>
    )
}

export default navigationItems