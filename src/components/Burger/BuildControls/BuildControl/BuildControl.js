import React from 'react';
import classes from './BuildControl.css';

 function buildControl(props) {
    
    return (
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.label}</div>
            <button className = {classes.Less} 
            onClick = {props.removeIngredient}
            disabled = {!props.disabledInfo[props.type]}>Less </button>
            <button className ={classes.More} onClick = {props.addIngredient} >More</button>
        </div>
    )
}

export default buildControl
