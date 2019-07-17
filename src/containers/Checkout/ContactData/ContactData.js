import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    orderHandler = () => {

    }
    render() {
        return (
            <div className = {classes.ContactData}>
                <h4>Enter your data here</h4>
                <form>
                    <input type = "text" name = "name" placeholder = "Your name"></input>
                    <input type = "email" name = "email" placeholder = "Your email"></input>
                    <input type = "text" name = "street" placeholder = "Street"></input>
                    <input type = "text" name = "postal" placeholder = "Postal"></input>
                    <Button btnType = "Success" clicked = {this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;
