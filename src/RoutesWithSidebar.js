// RouteWithSidebar.js
import React from 'react';
import { Route } from 'react-router-dom';
import Preloader from './components/Preloader';

const RouteWithSidebar = ({ component: Component, role, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={false} /> {/* Adjust the show prop as needed */}
        <Component {...props} />
      </>
    )} />
  );
};

export default RouteWithSidebar;
