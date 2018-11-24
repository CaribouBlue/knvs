import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './';

const Router = props => (
  <BrowserRouter basename="">
    <Routes loadedData={window._state} />
  </BrowserRouter>
);

export default Router;
