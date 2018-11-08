import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './';

const Router = props => (
  <BrowserRouter basename="">
    <Routes />
  </BrowserRouter>
);

export default Router;
