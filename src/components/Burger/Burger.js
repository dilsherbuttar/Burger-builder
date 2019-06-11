import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    //this const is an array of react elements, we can display
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((name,i) => {
                return <BurgerIngredient key = {igKey + i} type = {igKey}/>
            })
        })
        .reduce( (acc, curr ) => {
            return acc.concat(curr);
        },[]);
    //used reduce to flatten the array
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
   
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>  
            <br />
            <p>Total Price: ${props.totalPrice}</p>
        </div>
    )
}

export default burger
