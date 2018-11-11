import express from 'express';
import utils from '../../utils';
import models from '../../db/models';

const router = express.Router();

router.post('/create', (req, res) => {
  const { username, password } = req.body;

  const user = new models.User({ username });

  user.addPassword(password, (err) => {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'error adding password', '/create:user.addPassword');
      return res.status(500).send(errorRespObj);
    }

    user.assignArtist(username, (err) => {
      if (err) {
        const errorRespObj = utils.err
          .handleErr(err, null, 'error assigning artist', '/create:user.assignArtist');
        return res.status(500).send(errorRespObj);
      }

      user.save((err) => {
        if (err) {
          const errorRespObj = utils.err
            .handleErr(err, null, 'error saving user to db', '/create:user.save');
          return res.status(500).send(errorRespObj);
        }

        const respObj = utils.resp.createRespObj(null, null, 'user created');
        res.send(respObj);
      })

    });
  })
});

export default router;
