import React, { Component } from 'react';
import passwordIcon from '../../assets/password_black_24dp.svg';
import './ForgotPasswordEmailForm.css';
import { forgot } from '../../api/users';

class ForgotPasswordEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            formSubmitted: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.form = React.createRef();
        this.emailInput = React.createRef();
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.validation()) {
            alert(`submitting: ${this.state.email}`)
            this.setState({ formSubmitted: true });
            
            const email = this.state.email;
            //console.log(email, password);

            //ENDRE DENNE
            const res = await forgot({email});

            if (res.error) {
                this.setState({ error: res.error.message });
            } else {
                this.setState({ formSubmitted: true });
            } 
        } else {
            this.setState({ error: "The form is not valid!" });
        }
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
            error: '',
            formSubmitted: false
        });
        this.emailInput.current.focus();
    }

    componentDidMount() {
        this.emailInput.current.focus();
    }

    validation() {
        return this.form.current.reportValidity();
    }

    render() {
        return (
            <div className="container forgot-password-email-form">
                <img src={passwordIcon} alt="" />
                <form ref={this.form} onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Forgot password</legend>
                        <p>If you have forgotten your password, you can use this form to reset your password. You will receive an email with instructions. </p>
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
                        <p className="low-emphasis form-explain">The email address you are registered with is required to reset your password.</p>
                        {this.state.formSubmitted && <p className="success-message" onClick={this.handleClose}><strong>success:</strong> an email with further instructions is sent to {this.state.email}.</p>}
                        <button type="submit">reset password</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ForgotPasswordEmailForm;