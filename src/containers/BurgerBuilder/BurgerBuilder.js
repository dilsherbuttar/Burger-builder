import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Aux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  addIngredientHandler = type => {
    let currentCount = this.state.ingredients[type];
    let updatedCount = currentCount + 1;
    const priceAddition = INGRIDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    let currentCount = this.state.ingredients[type];
    if (currentCount <= 0) {
      return;
    }
    let updatedCount = currentCount - 1;
    let updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };
    const priceSubstraction = INGRIDIENT_PRICES[type];
    let newPrice = this.state.totalPrice - priceSubstraction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = ingredients => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  modalCloseHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('you continued')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] > 0;
    }
    

    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.modalCloseHandler}>
          <OrderSummary ingredients={this.state.ingredients} 
          continue = {this.purchaseContinueHandler}
          cancel = {this.modalCloseHandler}
          price = {this.state.totalPrice}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing = {this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
