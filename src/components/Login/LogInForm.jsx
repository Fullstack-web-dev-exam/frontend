import React, { Component } from 'react';
import './LogInForm.css';
import lockClosedIcon from '../../assets/lock_black_24dp.svg';
import lockOpenIcon from '../../assets/lock_open_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';
import { Link, Redirect } from "react-router-dom";
import Button from '../Button/Button'
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard'

class LogInForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            redirect: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    handleClose() {
        this.setState({
            error: false
        });
        this.emailInput.current.focus();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validation()) {
            const { email, password } = this.state;
            const res = await this.context.login({ email, password });

            if (res.error) {
                
                //The user is most probably not found in the database
                this.setState({ error: true });
            } else {
                this.setState({ redirect: "/user" });
            }
        } else {
            alert("This form is not valid!");
            this.setState({ error: true });
        }
    }

    validation() {
        return this.form.current.reportValidity();
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={this.state.redirect} />)
        }

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
                                    type="email"
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

                                <Button type="submit" label="log in" variant="primary" size="full"/>
                            </fieldset>
                        </form>

                        {this.state.error && <UserFeedbackCard onClick={this.handleClose} variant="error" feedbackText="Wrong email and/or password. Please try again."/>}
                        <Link to="/reset_password">Forgot password?</Link>
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