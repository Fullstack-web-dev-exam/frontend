import React, { Component } from 'react';
import passwordIcon from '../../assets/password_black_24dp.svg';
import './ForgotPasswordEmailForm.css';
import { forgot } from '../../api/users';
import Button from '../Button/Button'
import UserFeedbackCard from '../UserFeedbackCard/UserFeedbackCard';
import { toast } from 'react-toastify'

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
            this.setState({ formSubmitted: true });
            
            this.notifySuccess();
            
            const email = this.state.email;

            await forgot({email});

        } else {
            this.setState({ error: "The form is not valid!" });
            this.notifyError()
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

    notifySuccess = () => {
        toast.success(`An email with further instructions is sent to ${this.state.email}.`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    notifyError = () => {
        toast.error("The form did not pass validation", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

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
                        {this.state.formSubmitted && <UserFeedbackCard variant="success" feedbackText= {`an email with further instructions is sent to ${this.state.email}.`} onClick={this.handleClose}/>}
                        
                        <Button type="submit" label="reset password" size="full" /> 
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default ForgotPasswordEmailForm;