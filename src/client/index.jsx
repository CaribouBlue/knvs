import React from 'react';
import { render } from 'react-dom';
import { Router } from './modules/router';

render((
    <Router />
  ),
  document.getElementById('app-anchor')
);
