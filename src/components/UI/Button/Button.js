import React from 'react';
import classes from './Button.css'
//pass in the button type in the props thru btnType--> options Success or Danger

const button = (props) => {
    return (
        <button 
        className = {[classes.Button, classes[props.btnType]].join(' ')}
        onClick = {props.clicked}
        >
            {props.children}
        </button>
    )
}

export default button
