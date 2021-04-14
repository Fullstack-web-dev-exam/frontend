import React, { Component } from 'react';
import editUserForm from '../../assets/edit_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';
import Button from '../Button/Button'
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

class UpdateUserForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            role: '',
            email: '',
            oldPassword: '',
            password: '',
            repeatpassword: '',
            passwordError: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClosePassword = this.handleClosePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.form = React.createRef();
        this.firstnameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    //Set focus to the first input field of the form: first name
    componentDidMount() {
        this.firstnameInput.current.focus();
        if (this.props.place === "dashboard") {

            this.pronoun = 'their';

            this.setState({
                firstname: this.props.selectedUser.name,
                surname: this.props.selectedUser.surname,
                role: this.props.selectedUser.role,
                email: this.props.selectedUser.email
            })
        } else {
            this.pronoun = 'your'

            this.setState({
                firstname: this.props.selectedUser.name,
                surname: this.props.selectedUser.surname
            })
        }
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

    getPayload() {
        let payloadObj = {}

        if (this.props.place) {
            payloadObj.place = this.props.place
        }

        if (this.props.selectedUser.email) {
            payloadObj.selectedUser = this.props.selectedUser.email;
        }

        if (this.state.email) {
            payloadObj.email = this.state.email
        }

        if (this.state.firstname) {
            payloadObj.name = this.state.firstname
        }

        if (this.state.surname) {
            payloadObj.surname = this.state.surname
        }

        if (this.state.role) {
            payloadObj.role = this.state.role
        }

        if (this.state.oldPassword) {
            payloadObj.oldPassword = this.state.oldPassword
        }

        if (this.state.password) {
            payloadObj.password = this.state.password
        }

        return payloadObj;
    }

    //HandleSubmit runs two validators, first checking if the passwords match, thereafter a more general form validator
    async handleSubmit(event) {
        event.preventDefault();

        if (this.generalValidation() && this.passwordValidation()) {
            const userObject = this.getPayload()
            if (this.props.place === "dashboard") {
                console.log("Dashboard update");
                this.props.onUpdateDashboard(userObject);
                this.notifySuccess()
            } else {
                this.props.onUpdateProfile(userObject)
                this.notifySuccess()
                console.log("Else update");
            }


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
    handleClosePassword() {
        this.setState({
            passwordError: false
        });
        this.passwordInput.current.focus();
    }

    notifySuccess = () => {
        toast.success("The user has been updated", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    notifyError = () => {
        toast.error("The form did not pass validation", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    passwordError = () => {
        toast.error("The passwords entered do not match.", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <img src={editUserForm} alt="" />
                    <form ref={this.form} onSubmit={this.handleSubmit} method="POST">
                        <fieldset>
                            <legend>Update {this.pronoun} user information</legend>
                                {this.props.place === "dashboard" &&
                                    <>
                                        <label htmlFor="email">email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            onChange={this.handleInputChange}
                                            placeholder="Enter Your New Email"
                                            type="text"
                                            value={this.state.email}
                                        />
                                    </>}

                                <label htmlFor="firstname">first name</label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Your New First Name"
                                    ref={this.firstnameInput}
                                    type="text"
                                    value={this.state.firstname}
                                />

                                <label htmlFor="surname">surname</label>
                                <input
                                    id="surname"
                                    name="surname"
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Your New Surname"
                                    type="text"
                                    value={this.state.surname}
                                />

                                {this.props.place === "dashboard" &&
                                    <>
                                        <label htmlFor="role">role</label>
                                        <select
                                            id="role"
                                            name="role"
                                            onChange={this.handleInputChange}
                                            value={this.state.role}
                                        >
                                            <option value="">Choose role</option>
                                            <option value="gardener">Gardener</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                    </>}

                                {this.props.place === "profile" &&
                                    <>

                                        <label htmlFor="oldPassword">old password</label>
                                        <input
                                            id="oldPassword"
                                            name="oldPassword"
                                            onChange={this.handleInputChange}
                                            placeholder="Enter Your Old Password"
                                            title="Eight or more characters"
                                            type="password"
                                            value={this.state.oldPassword}
                                        />

                                        <label htmlFor="password">new password</label>
                                        <input
                                            id="password"
                                            name="password"
                                            onChange={this.handleInputChange}
                                            pattern=".{8,}"
                                            placeholder="Enter Your New Password"
                                            ref={this.passwordInput}
                                            title="Eight or more characters"
                                            type="password"
                                            value={this.state.password}
                                        />

                                        <label htmlFor="repeatpassword">repeat new password</label>
                                        <input
                                            id="repeatpassword"
                                            name="repeatpassword"
                                            onChange={this.handleInputChange}
                                            pattern=".{8,}"
                                            placeholder="Repeat Your New Password"
                                            title="Eight or more characters"
                                            type="password"
                                            value={this.state.repeatpassword}
                                        />
                                    </>}
                            {this.state.passwordError && <UserFeedbackCard onClick={this.handleClosePassword} variant="error" feedbackText="The passwords entered are not the same." />}
                            <Button type="submit" label="update" />
                            {this.props.place === 'dashboard' && <Button type="button" label="cancel" variant="danger-outlined" onClick={this.props.onAbortClick} />}

                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

UpdateUserForm.propTypes = {
    /** Checks if the button should be active (visually only).
     * Currently, only the 'secondary-outlined" receives styles when active is set.
    */
    place: PropTypes.oneOf(['profile', 'dashboard']).isRequired,

    /** Checks if the button should be disabled (HTML disabled attribute). */
    selectedUser: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        role: PropTypes.oneOf(['gardener', 'manager']),
        surname: PropTypes.string,
    }).isRequired,

    /** The text to display on the button. */
    onUpdateDashboard: PropTypes.func,

    /** The OnClick eventHandler. */
    onUpdateProfile: PropTypes.func,

    /** The width of the button. */
    onAbortClick: PropTypes.func
}

export default UpdateUserForm;