import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
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
      let form = (<form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>);
      if (this.state.loading) {
          form = <Spinner />
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
