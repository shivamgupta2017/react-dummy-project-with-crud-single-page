import React from 'react';

import { NavLink, Switch, Route } from 'react-router-dom';

import { About } from './About';
import { Contact } from './Contact';
import { Home } from './Home';
import {Layout} from './Layout';
import { Login } from './Login';
import {Signup} from './Signup';
const Main = () => {
    return (
        <Switch>
            <Route exact path='/login' render={(props) => <Login {...props}/>}></Route>
            <Route exact path='/' render={(props) => <Layout {...props}/>}></Route>
            <Route exact path='/sign-up'  render={(props) => <Signup {...props}/>}></Route>
            {/* <Route exact path='/contact' component={Contact}></Route> */}
        </Switch>
    );
}

export { Main };
