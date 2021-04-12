import React, { Component } from 'react';
import './AddUserForm.css';
import addUserIcon from '../../assets/person_add_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';
import { createUser } from '../../api/users';

class AddUserForm extends Component {
    static contextType = AuthContext;

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
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form = React.createRef();
        //bedre navn
        this.firstnameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    //Set focus to the first input field of the form: first name
    componentDidMount() {
        this.firstnameInput.current.focus();
    }

    //General InputChangeHandler that saves the value of the input field to the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    //HandleSubmit runs two validators, first checking if the passwords match, thereafter a more general form validator
    async handleSubmit(event) {
        event.preventDefault();

        if (this.generalValidation() && this.passwordValidation()) {

            //Send the information stored in the state to the back-end
            const headers = this.context.generateHeaders();
            //console.log(headers);
            const userObject = {
                name: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            }
            const res = await createUser(headers, userObject);
            if (res.error) {
                alert(`Something went wrong during creation ${res.error}`);
            }
        } else {
            alert('the form did not pass validation');
        }
    }

    generalValidation() {
        return this.form.current.reportValidity();
    }

    passwordValidation() {
        if (this.state.password === this.state.repeatpassword) {
            this.setState({
                passwordError: false
            });
            return true;
        } else {
            this.setState({
                passwordError: true
            });
            return false;
        }
    }

    //Close the red error message that pops up when the two passwords do not match
    handleClose() {
        this.setState({
            passwordError: false
        });
        this.passwordInput.current.focus();
    }

    render() {
        return (
            <>
                <div className="container">
                    <img src={addUserIcon} alt="" />
                    <form ref={this.form} onSubmit={this.handleSubmit} className="add-user-form">
                        <fieldset>
                            <legend>Add a new user</legend>
                            <div className="add-user-grid-container">
                                <div className="first-name-grid-item">
                                    <label htmlFor="firstname">first name</label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Their First Name"
                                        ref={this.firstnameInput}
                                        required
                                        type="text"
                                        value={this.state.firstname}
                                    />
                                </div>

                                <div className="surname-grid-item">
                                    <label htmlFor="surname">surname</label>
                                    <input
                                        id="surname"
                                        name="surname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Their Surname"
                                        required
                                        type="text"
                                        value={this.state.surname}
                                    />
                                </div>

                                <div className="email-grid-item">
                                    <label htmlFor="email">email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={this.handleInputChange} value={this.state.email}
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        placeholder="Enter Their Email"
                                        required
                                        title="Please enter a valid email"
                                        type="email"
                                    />
                                </div>

                                <div className="role-grid-item">
                                    <label htmlFor="role">role</label>
                                    <select
                                        name="role"
                                        onChange={this.handleInputChange}
                                        value={this.state.role}
                                    >
                                        <option value="gardener">Gardener</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>

                                <div className="password-grid-item">
                                    <label htmlFor="password">password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Enter Their Password"
                                        ref={this.passwordInput}
                                        required
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.password}
                                    />
                                </div>

                                <div className="repeat-password-grid-item">
                                    <label htmlFor="repeatpassword">repeat password</label>
                                    <input
                                        id="repeatpassword"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        placeholder="Repeat Their Password"
                                        required
                                        type="password"
                                        value={this.state.repeatpassword}
                                    />
                                </div>
                            </div>

                            {this.state.passwordError && <p className="error-message" onClick={this.handleClose}><strong>Validation Error</strong>: The passwords entered are not the same.</p>}

                            <button type="submit">add new user</button>
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default AddUserForm;