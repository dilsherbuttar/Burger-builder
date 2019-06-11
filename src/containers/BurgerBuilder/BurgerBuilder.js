import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },

    totalPrice : 4 
  }

  addIngredientHandler = (type) => {
    let currentCount = this.state.ingredients[type];
    let updatedCount = currentCount+ 1;
    let {ingredients} = this.state;
    const priceAddition = INGRIDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    
     this.setState({
      ingredients : {
        ...ingredients, [type] :updatedCount
      },
      totalPrice : newPrice
     });

     

  }

  removeIngredientHandler = (type) => {
    let currentCount = this.state.ingredients[type];
    let updatedCount;
    if ((currentCount - 1) <= 0) {
      updatedCount = 0;
    } else {
      updatedCount = currentCount - 1;
    }
    let {ingredients} = this.state;
    const priceSubstraction = INGRIDIENT_PRICES[type];
    let newPrice;
    if ( (this.state.totalPrice - priceSubstraction) <= 4) {
      newPrice = 4;
    } else {
      newPrice = this.state.totalPrice - priceSubstraction
    }


    this.setState({
      ingredients: {
        ...ingredients,
        [type]: updatedCount
      },
      totalPrice: newPrice
    })
    
  }
  render() {
    console.log(this.state);
      return (
        <Aux> 
            <Burger ingredients = {this.state.ingredients}
            totalPrice = {this.state.totalPrice}/>
            <BuildControls 
            addIngredient = {this.addIngredientHandler}
            removeIngredient = {this.removeIngredientHandler}
            />
        </Aux>
      )
  }
}

export default BurgerBuilder;