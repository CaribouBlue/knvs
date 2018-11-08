import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtistDashboard from '../artist-dashboard/ArtistDashboard';
import Landing from '../landing/Landing';

const Routes = props => (
  <Switch>
  <Route exact path="/" component={Landing} />
    <Route exact path="/artist" component={ArtistDashboard} />
  </Switch>
);
// <Route path="*" component={PageNotFound} />

export default Routes;
