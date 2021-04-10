import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './LogInForm.css';
import lockOpenIcon from '../../assets/lock_open_black_24dp.svg';
import lockClosedIcon from '../../assets/lock_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';

class LogInForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.form = React.createRef();
        this.emailInput = React.createRef();
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        //alert(`you are submitting the email: '${this.state.email}' and the password: '${this.state.password}'`);
        event.preventDefault();

        if (this.validation()) {
            const { email, password } = this.state;
            //console.log(email, password);
            const res = await this.context.login({ email, password });

            if (res.error) {
                this.setState({ error: res.error.message });
            }
        } else {
            this.setState({ error: "The form is not valid!" });
        }
    }

    validation() {
        return this.form.current.reportValidity();
    }

    render() {
        return (
            <>
                {!this.context.isAuth && <>
                    <div className="container">
                        <img src={lockClosedIcon} alt="" />
                        <form ref={this.form} onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Log In</legend>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Your Email"
                                    ref={this.emailInput}
                                    required
                                    type="text"
                                    value={this.state.email}
                                />

                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Your Password"
                                    required
                                    type="password"
                                    value={this.state.password}
                                />

                                <button type="submit">log in</button>
                            </fieldset>
                        </form>
                        <Link to="/forgotpassword">Forgot password?</Link>
                    </div>
                </>}
                {this.context.isAuth && <div className="container loggedIn">
                    <img src={lockOpenIcon} alt="" />
                    <p>You're already logged in.</p>
                    <Link to="/user">Visit your user page here.</Link>
                </div>}
            </>
        );
    }
}

export default LogInForm;