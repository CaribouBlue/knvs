import React from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'underscore';
import routesConfig from './config';

const Routes = props => {
  return (
    <Switch>
      {
        routesConfig.map(routeConfig =>
          <Route exact key={_.uniqueId()} path={routeConfig.path} render={renderProps => {
            console.log(routeConfig.path, props)
            return <routeConfig.component {...renderProps} {...props} />
          }} />
        )
      }
    </Switch>
  )
};
// <Route path="*" component={PageNotFound} />

export default Routes;
