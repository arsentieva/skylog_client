import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  // const token = window.localStorage.getItem('state-skylog-app-token');
  // const needLogin= !token;

  return (
    <Route {...rest} render={matchProps =>
       (
        // needLogin === true ? (<Redirect to="/" /> ) :
        (<Layout> <Component {...matchProps} /> </Layout>)
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
