import express from 'express';
import React from 'react';
import _ from 'underscore';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Switch, Route, matchPath } from 'react-router-dom';
import generateHtml from './generateHtml';
import { routesConfig, Routes } from '../../../client/modules/router';

const router = express.Router();

router.get('*', (req, res) => {
  const context = {};

  const uuid = req.session.uuid;

  const promises = [];

  routesConfig.forEach(config => {
    const match = matchPath(req.originalUrl, config.path);
    if (match && config.loadData) promises.push(config.loadData(match));
    return match;
  });

  Promise.all(promises)
    .then(data => {
      const app = renderToString(
        <StaticRouter basename="/" context={context} location={req.originalUrl} >
          <Routes loadedData={data} />
        </StaticRouter>
      );

      if (context.redirect) {
        res.status(context.redirect.status || 300).redirect(context.redirect.url);
      } else{
        res.status(200).send(generateHtml(app, data));
      }
    });
});

export default router;
