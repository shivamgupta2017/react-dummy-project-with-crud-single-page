import React from 'react';

import { NavLink, Link } from 'react-router-dom';

const NavigationAfterLogin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">


      <div className="col-12">
        <div className="row">

        <div className="custom-margin">
            {/* <a href="javascript:void(0)"> */}
            <NavLink to='/login' >Logout</NavLink>
                
            {/* </a> */}
        </div>
        </div>
      </div>

    </nav>




  );
}

export { NavigationAfterLogin };
