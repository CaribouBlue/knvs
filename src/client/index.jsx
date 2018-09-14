import React from 'react';
import { render } from 'react-dom';
import Router from './components/router/Router.jsx';
import './style';

render((
    <Router />
  ),
  document.getElementById('app-anchor')
);