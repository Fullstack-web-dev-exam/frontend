import React, { Component } from 'react';
import addUserIcon from '../../assets/person_add_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';

class UpdateUserForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            surname: '',
            oldPassword: '',
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
            const userObject = {
                name: this.state.firstname,
                surname: this.state.surname
            }
            this.props.onUpdate(userObject)
            
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
                    <form ref={this.form} onSubmit={this.handleSubmit} className="add-user-form" method="POST">
                        <fieldset>
                            <legend>Update information</legend>
                            <div className="add-user-grid-container">
                                <div className="first-name-grid-item">
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
                                </div>

                                <div className="surname-grid-item">
                                    <label htmlFor="surname">surname</label>
                                    <input
                                        id="surname"
                                        name="surname"
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Your New Surname"
                                        type="text"
                                        value={this.state.surname}
                                    />
                                </div>

                                <div className="password-grid-item">
                                    <label htmlFor="oldPassword">old password</label>
                                    <input
                                        id="oldPassword"
                                        name="oldPassword"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Enter Your Old Password"
                                        //required
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.oldPassword}
                                    />
                                </div>
                                
                                <div className="password-grid-item">
                                    <label htmlFor="password">new password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={this.handleInputChange}
                                        pattern=".{8,}"
                                        placeholder="Enter Your New Password"
                                        ref={this.passwordInput}
                                        //required
                                        title="Eight or more characters"
                                        type="password"
                                        value={this.state.password}
                                    />
                                </div>

                                <div className="repeat-password-grid-item">
                                    <label htmlFor="repeatpassword">repeat new password</label>
                                    <input
                                        id="repeatpassword"
                                        name="repeatpassword"
                                        onChange={this.handleInputChange}
                                        placeholder="Repeat Your New Password"
                                        //required
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

export default UpdateUserForm;