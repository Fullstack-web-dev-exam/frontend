import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './LogInForm.css';

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert(`you are submitting the email: '${this.state.email}' and the password: '${this.state.password}'`);
        event.preventDefault();
      }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Log In</legend>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter Your Email" name="email" required onChange={this.handleInputChange} value={this.state.email}/>

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Your Password" name="password" required onChange={this.handleInputChange} value={this.state.password}/>

                        <button type="submit">log in</button>
                    </fieldset>
                    <Link to="/forgotpassword">Forgot password?</Link>
                </form>
            </>
        );
    }
}

export default LogInForm;