import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../../../client/components/router/Routes';
import generateHtml from './generateHtml';

const router = express.Router();

router.get('*', (req, res) => {
  const context = {};

  const app = renderToString(
    <StaticRouter basename="/" context={context} location={req.url} >
      <Routes />
    </StaticRouter>
  );

  res.status(200).send(generateHtml(app));
});

export default router;
