import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const GatedRoute = ({component: Component, condition, redirect, ...rest}) => (
  <Route {...rest} render={(props) => (
    condition ? <Component {...props} /> : <Redirect to={redirect} />
  )} />
);

export default GatedRoute;