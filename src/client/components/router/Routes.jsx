import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtistDashboard from '../artist-dashboard/ArtistDashboard';

const Routes = props => (
  <Switch>
    <Route exact path="/" component={ArtistDashboard} />
  </Switch>
);
    // <Route path="*" component={PageNotFound} />

export default Routes;