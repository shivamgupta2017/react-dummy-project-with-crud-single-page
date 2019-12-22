import React from 'react';
import { NavigationAfterLogin } from './NavigationAfterLogin';
import { Home } from './Home';
import { Switch, Route } from 'react-router-dom';

const Layout = () => {

    return (
        <div>
            <NavigationAfterLogin />


            <main role="main">


                <Switch>
                    <Route exact path='/' render={(props) => <Home {...props}/>}></Route>
                    {/* <Route exact path='/contact' component={Contact}></Route> */}
                </Switch>

            </main>


        </div>

    );
}

export { Layout };