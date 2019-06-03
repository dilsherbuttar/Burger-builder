import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component  {

    render () {

        let ingredient = null;
        //depending on the ingredient, give the div appropriate className
        switch (this.props.type) {
            case ('bread-bottom'):
              ingredient = <div className = {classes.BreadBottom}></div>
              break;
            case ('bread-top'):
              ingredient = (
                <div className = {classes.BreadTop}>
                  <div className = {classes.Seeds1}></div>
                  <div className = {classes.Seeds2}></div>
                </div>
              );
              break; 
            case ('meat'):
              ingredient = <div className = {classes.Meat}></div>
              break;
    
            case ('cheese'):
              ingredient = <div className = {classes.Cheese}></div>
              break; 
            case ('salad'):
              ingredient = <div className = {classes.Salad}></div>
              break; 
            case ('bacon'):
              ingredient = <div className = {classes.Bacon}></div>
              break;
            default:
              ingredient = null;              
        }

        return ingredient;
    }

  }
  //add prop-types property to the class with a lower case p and setting it equal to a JavaScript object
  BurgerIngredient.propTypes = {
      type: PropTypes.string.isRequired
  }


export default BurgerIngredient;