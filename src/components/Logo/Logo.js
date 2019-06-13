import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

function logo(props) {
    return (
        <div 
        style = {{height:props.height}}
        className = {classes.Logo}>
            <img src = {burgerLogo} alt = "My Burger"></img>
        </div>
    )
}

export default logo
