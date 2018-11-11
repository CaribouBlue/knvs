import React from 'react';
import { Switch, Route } from 'react-router-dom';
import _ from 'underscore';
import { ArtistDashBookings } from '../artist-dash';
import { Landing } from '../components';

const routesConfig = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/artist/bookings',
    component: ArtistDashBookings,
  },
];

const Routes = props => (
  <Switch>
    {
      routesConfig.map(routeConfig =>
        <Route exact key={_.uniqueId()} {...routeConfig} />
      )
    }
  </Switch>
);
// <Route path="*" component={PageNotFound} />

export default Routes;
