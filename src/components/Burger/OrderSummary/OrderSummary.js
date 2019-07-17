import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const summaryObject = props.ingredients;
  const ingredients = Object.keys(props.ingredients);

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Delicious burger with following ingredients</p>

      <ul>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient}>
              <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
              {summaryObject[ingredient]}
            </li>
          );
        })}
      </ul>
      <p>
        <strong>Total Price: </strong>${props.price.toFixed(2)}
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
