import React, { Component } from 'react';
import './LogInForm.css';
import lockClosedIcon from '../../assets/lock_black_24dp.svg';
import lockOpenIcon from '../../assets/lock_open_black_24dp.svg';
import { AuthContext } from '../../helpers/Auth';
import { Link, Redirect } from "react-router-dom";

class LogInForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
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
            error: ''
        });
        this.emailInput.current.focus();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validation()) {
            const { email, password } = this.state;
            //console.log(email, password);
            const res = await this.context.login({ email, password });

            if (res.error) {
                this.setState({ error: res.error.message });
            } else {
                this.setState({ redirect: "/user" });
            }
        } else {
            this.setState({ error: "The form is not valid!" });
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

                                <button type="submit">log in</button>
                            </fieldset>
                        </form>
                        {this.state.error && <p className="error-message" onClick={this.handleClose}><strong>Error:</strong> Wrong email and/or password. Please try again.</p>}
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