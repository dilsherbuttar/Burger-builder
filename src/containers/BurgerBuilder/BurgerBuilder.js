import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Aux";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.5
};

class BurgerBuilder extends Component {
  state = {
    
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    spinner: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-5c557.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });
  }

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
    this.setState({ purchasing: true });
  };

  modalCloseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + this.state.ingredients[i])
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] > 0;
    }

    let summary = null;
    if (this.props.ings) {
      summary = (
        <OrderSummary
          ingredients={this.props.ings}
          continue={this.purchaseContinueHandler}
          cancel={this.modalCloseHandler}
          price={this.state.totalPrice}
        />
      );
    }

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved }
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
    }
    if (this.state.spinner) {
      summary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalCloseHandler}
        >
          {summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {

    ings: state.ingredients
    
  }
}

const mapDispacthToProps = dispatch => {
  return {
    onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: name}),
    onIngredientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
  }
}


export default connect(mapStateToProps, mapDispacthToProps)(withErrorHandler(BurgerBuilder, axios));
