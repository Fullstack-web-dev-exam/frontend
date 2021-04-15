import React, { Component } from 'react';
import './AddUserForm.css';
import addUserIcon from '../../assets/person_add_black_24dp.svg';
import Button from '../Button/Button'
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import { toast } from 'react-toastify'

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
            passwordError: false,
            submitted: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form = React.createRef();
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
            //console.log(headers);
            const userObject = {
                name: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            }
            await this.props.onSubmit(userObject);

            this.setState({
                firstname: '',
                surname: '',
                email: '',
                role: 'gardener',
                password: '',
                repeatpassword: '',
                submitted: true
            })
            this.notifySuccess();
        } else {
            this.notifyError();
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
            this.passwordError()
            return false;
        }
    }

    //Close the red error message that pops up when the two passwords do not match
    handleClose() {
        this.setState({
            passwordError: false,
            submitted: false
        });
        this.passwordInput.current.focus();
    }

    //Part of 'react-toastify'
    notifySuccess = () => {
        toast.success("The user has been added", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    //Part of 'react-toastify'
    notifyError = () => {
        toast.error("There was an error", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    //Part of 'react-toastify'
    passwordError = () => {
        toast.error("The passwords entered do not match.", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

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
                                        id="role"
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

                            {this.state.passwordError && <UserFeedbackCard variant="error" onClick={this.handleClose} feedbackText="The passwords entered are not the same." />}
                            {this.state.submitted && <UserFeedbackCard variant="success" onClick={this.handleClose} feedbackText="The user has been added" />}

                            <Button label="add new user" size="full" variant="primary" type="submit" />
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default AddUserForm;