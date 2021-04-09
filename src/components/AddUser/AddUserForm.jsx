import React, { Component } from 'react';
import './AddUserForm.css';
import addUserIcon from '../../assets/person_add_black_24dp.svg';


class AddUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            email: '',
            role: 'gardener',
            password: '',
            repeatpassword: '',
            passwordError: false
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
        event.preventDefault();

        if (this.state.password === this.state.repeatpassword) {
            this.setState({
                passwordError: false
            });
        } else {
            this.setState({
                passwordError: true
            });
        }

        alert(`you are submitting the email: '${this.state.email}' and the password: '${this.state.password}'`);
    }

    render() {
        return (
            <>
                <div className="container">
                    <img src={addUserIcon} alt="" />
                    <form onSubmit={this.handleSubmit} className="AddUserForm">
                        <fieldset>
                            <legend>Add a new user</legend>
                            <label htmlFor="firstname">first name</label>
                            <input type="text" id="firstname" placeholder="Enter Their First Name" name="firstname" required onChange={this.handleInputChange} value={this.state.firstname} />

                            <label htmlFor="surname">surname</label>
                            <input type="text" id="surname" placeholder="Enter Their Surname" name="surname" required onChange={this.handleInputChange} value={this.state.surname} />

                            <label htmlFor="email">email</label>
                            <input type="email" id="email" placeholder="Enter Their Email" name="email" required 
                            onChange={this.handleInputChange} value={this.state.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please enter a valid email"/>

                            <label htmlFor="role">role</label>
                            <select value={this.state.role} onChange={this.handleInputChange}>
                                <option value="gardener">Gardener</option>
                                <option value="manager">Manager</option>
                            </select>

                            <label htmlFor="password">password</label>
                            <input type="password" id="password" placeholder="Enter Their Password" name="password" required onChange={this.handleInputChange} value={this.state.password} pattern=".{8,}" title="Eight or more characters"/>

                            <label htmlFor="repeatpassword">repeat password</label>
                            <input type="password" id="repeatpassword" placeholder="Repeat Their Password" name="repeatpassword" required onChange={this.handleInputChange} value={this.state.repeatpassword} />

                            {this.state.passwordError && <p className="errorMessage"><strong>Validation Error:</strong> The passwords entered are not the same.</p>}

                            <button type="submit">add new user</button>
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default AddUserForm;