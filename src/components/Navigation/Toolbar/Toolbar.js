import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

function toolbar(props) {
    return (
        <header className = {classes.Toolbar}>
          <DrawerToggle clicked = {props.clicked}/>
          <div className = {classes.Logo}>
            <Logo />
          </div>
            <nav className = {classes.DeskTopOnly}>
                <NavigationItems />
            </nav>  
        </header>
    )
}

export default toolbar
