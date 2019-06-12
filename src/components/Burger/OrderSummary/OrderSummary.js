import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const summaryObject = props.ingredients;
    const ingredients = Object.keys(props.ingredients);
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious burger with following ingredients</p>
            
            <ul>
                {ingredients.map(ingredient => {
                    return <li key = {ingredient}>
                    <span style = {{textTransform : 'capitalize'}}>{ingredient}</span> 
                    : {summaryObject[ingredient]}
                    </li>
                })}
            </ul>
            <p>Continue to checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    )
}

export default orderSummary
