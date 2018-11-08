import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtistDash from '../artist-mods/artist-dash';
import { Landing } from '../components';

const Routes = props => (
  <Switch>
  <Route exact path="/" component={Landing} />
    <Route exact path="/artist" component={ArtistDash} />
  </Switch>
);
// <Route path="*" component={PageNotFound} />

export default Routes;
