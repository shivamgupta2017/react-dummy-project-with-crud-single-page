import React from 'react';
import { NavigationAfterLogin } from './NavigationAfterLogin';
import { AuthService } from '../services/Auth.service';

export class Signup extends React.Component {




    constructor(props) {

        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            fullName: '',
            password2: '',
            isEmailValid: true
        };
        this.authService = new AuthService();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.state.fullName === '' || this.state.emailAddress === '' || this.state.password === '' || !this.state.isEmailValid) {
            return;
        }
        const fetchResponse = await this.authService.doSignUPNow(this.state);
        const jsonResponse = await fetchResponse.json();
        if (fetchResponse.status === 200) {
            this.props.history.push(`/login`)
            alert('user created successfully');
        }

    }

    updateEmailAddress(value) {

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({ emailAddress: value, isEmailValid: regex.test(value.toLowerCase()) });

    }



    render() {


        return (
            <div className="row">
                <div className="col-6 signup-margin">



                    <form className="form-signin" onSubmit={this.handleSubmit}>

                        <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

                        <label htmlFor="inputUser" className="sr-only">Full  name</label>
                        <input type="text" id="inputUser" className="form-control mb-3" placeholder="Full name" required="true"

                            value={this.state.fullName} onChange={(event) => this.setState({ fullName: event.target.value })}
                        />

                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required="true"
                            value={this.state.emailAddress} onChange={(event) => this.updateEmailAddress(event.target.value)} />

                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required="true"
                            value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />

                        <button className="btn btn-lg color-dark-green btn-block" type="submit">register</button>
                    </form>

                </div>


            </div>
        );
    }






}




