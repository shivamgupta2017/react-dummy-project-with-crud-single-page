import React from 'react';

import { NavLink } from 'react-router-dom';
import { AuthService } from '../services/Auth.service'

export class Navigation extends React.Component {


  constructor(props) {
    super(props);
    localStorage.clear();
    this.state = { emailAddress: '', password: '', error: { status: false, msg: '' } };

    this.onSubmittingLoginForm = this.onSubmittingLoginForm.bind(this);
    this.authService = new AuthService();
  }

  async onSubmittingLoginForm(event) {

    event.preventDefault();

    if(!this.state.error.status && this.state.password !=='' && this.state.emailAddress !=='') {

      const response = await this.authService.doLogin(this.state);
      const jsonResp = await response.json();
  
  
      if (response.status === 200) {
        const token = jsonResp.token;
        localStorage.setItem('Authorization', token);
        this.props.history.history.push('/')
        alert('login successfull');
        return;
      }
  
      alert('login failed');

    }
  }

  updateEmail(emailAddr) {

    this.setState({ emailAddress: emailAddr });
    const re = /\S+@\S+\.\S+/;
    if (!re.test(emailAddr)) {
      this.setState({
        error: { status: true, msg: 'email is not valid' }
      });
    } else {

      this.setState({
        error: { status: false, msg: '' }
      });

    }

  }

  render() {
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">

      <div className="col-12">
        <div className="row">

          <div className="col-6 custom-margin">

            <div className="row">

              <div className="col-12">

                <form onSubmit={this.onSubmittingLoginForm}>

                  <div className="form-row">
                    <div className="col-5">
                      <input type="text" className="form-control" placeholder="Email" value={this.state.emailAddress}
                          onChange={(e) => this.updateEmail(e.target.value)} />
                    </div>
                    <div className="col-5">
                      <input type="password" className="form-control" placeholder="Password" value={this.state.password}
                          onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>

                    <div className="col-2">
                      <button type="submit" className="btn color-dark-green">Sign in</button>
                    </div>
                  </div>

                </form>

              </div>

              <div className="col-12">

                <div className="col-8 custom-margin mt-1">

                  <span>
                    Don't have an account ?
                      </span>
                  <NavLink href="javascript:void(0)" to='/sign-up'>
                    {/* <NavLink to='/sign-up'>Sign Up</NavLink> */}
                    Sign Up
                  </NavLink> | <a href="javascript:void(0)">Forget Password</a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </nav>

  );

  }

  
}

