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

        if(this.validation()) {
            const {email, password} = this.state;
            //console.log(email, password);
            const res = await this.context.login({email, password});

            if(res.error){
                this.setState({error: res.error.message});
            }
        } else {
            this.setState({error: "The form is not valid!"});
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
                                <input type="text" id="email" placeholder="Enter Your Email" name="email" required onChange={this.handleInputChange} value={this.state.email} />

                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter Your Password" name="password" required onChange={this.handleInputChange} value={this.state.password} />

                                <button type="submit">log in</button>
                            </fieldset>
                            <Link to="/forgotpassword">Forgot password?</Link>
                        </form>
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