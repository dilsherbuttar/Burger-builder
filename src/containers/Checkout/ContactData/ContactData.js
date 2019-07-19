import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
          
        },
        value: ''
      }
    },
    loading: false
  };
  orderHandler = e => {
    e.preventDefault();
    this.setState({
      spinner: true
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Dilsher Buttar",
        address: {
          street: "500 El Camino Real",
          zipCode: 94010,
          country: "USA"
        },
        email: "buttar.dilsher@gmail.com"
      },
      delivery: "fastest"
    };
    console.log(order);
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({
          spinner: false,
          purchasing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          spinner: false,
          purchasing: false
        });
      });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
          key = {formElement.id}
          elementType={formElement.config.elementType}
          elementConfig = {formElement.config.elementConfig}
          value = {formElement.config.value}/>
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your data here</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
