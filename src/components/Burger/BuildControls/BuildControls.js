import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const buildControls =  (props) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'}
    ]
    return (
        <div className = {classes.BuildControls}>
        <p><strong>Total price:</strong>{props.price.toFixed(2)}</p>
           {controls.map(control => {
               return <BuildControl key ={control.label} 
               label = {control.label}
               type = {control.type} 
               addIngredient = {() => props.addIngredient(control.type)} 
               removeIngredient = {() => props.removeIngredient(control.type)}
               disabledInfo = {props.disabledInfo}
               />
           })}
           
           <button className = {classes.OrderButton}
           disabled = {!props.purchasable}
           onClick = {props.purchasing}
           >ORDER NOW</button>
        </div>
    )
}

export default buildControls;
