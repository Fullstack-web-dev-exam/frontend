import React, { Component } from 'react';
import './AddUserForm.css';
import addUserIcon from '../../assets/person_add_black_24dp.svg';
import { createUser } from '../../api/users';
import { AuthContext } from '../../helpers/Auth';

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
    handleSubmit(event) {
        event.preventDefault();

        if (this.generalValidation() && this.passwordValidation()) {
            alert('vellykket');
            //Send informasjonen som er i state til backend
            const headers = this.context.generateHeaders();
            console.log(headers.headers);
            const userObject = {
                name: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            }
            //Send informasjonen som er i state til backend
            createUser(headers.headers, userObject);
        } else {
            alert('lmaooooo det gikk feil XD')
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
                    <form ref={this.form} onSubmit={this.handleSubmit} className="AddUserForm">
                        <fieldset>
                            <legend>Add a new user</legend>
                            <div className="gridContainer">
                                <div className="firstNameGridItem">
                                    <label htmlFor="firstname">first name</label>
                                    <input type="text" id="firstname" placeholder="Enter Their First Name" name="firstname" required onChange={this.handleInputChange} value={this.state.firstname} ref={this.firstnameInput} />
                                </div>

                                <div className="surnameGridItem">
                                    <label htmlFor="surname">surname</label>
                                    <input type="text" id="surname" placeholder="Enter Their Surname" name="surname" required onChange={this.handleInputChange} value={this.state.surname} />
                                </div>

                                <div className="emailGridItem">
                                    <label htmlFor="email">email</label>
                                    <input type="email" id="email" placeholder="Enter Their Email" name="email" required
                                        onChange={this.handleInputChange} value={this.state.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        title="Please enter a valid email" />
                                </div>

                                <div className="roleGridItem">
                                    <label htmlFor="role">role</label>
                                    <select value={this.state.role} onChange={this.handleInputChange} name="role">
                                        <option value="gardener">Gardener</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>

                                <div className="passwordGridItem">
                                    <label htmlFor="password">password</label>
                                    <input type="password" id="password" placeholder="Enter Their Password" name="password" required onChange={this.handleInputChange} value={this.state.password} pattern=".{8,}" title="Eight or more characters" ref={this.passwordInput} />
                                </div>

                                <div className="repeatPasswordGridItem">
                                    <label htmlFor="repeatpassword">repeat password</label>
                                    <input type="password" id="repeatpassword" placeholder="Repeat Their Password" name="repeatpassword" required onChange={this.handleInputChange} value={this.state.repeatpassword} />
                                </div>
                            </div>

                            {this.state.passwordError && <p className="errorMessage" onClick={this.handleClose}><strong>Validation Error:</strong> The passwords entered are not the same.</p>}

                            <button type="submit">add new user</button>
                        </fieldset>
                    </form>
                </div>
            </>
        );
    }
}

export default AddUserForm;