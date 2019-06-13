import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

function toolbar(props) {
    return (
        <header className = {classes.Toolbar}>
            <Logo height = "80%"/>
            <nav>
                <NavigationItems />
            </nav>  
        </header>
    )
}

export default toolbar
