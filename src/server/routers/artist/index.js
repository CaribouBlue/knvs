import express from 'express';
import utils from '../../utils';
import models from '../../db/models';

const router = express.Router();

router.get('/bookings', (req, res) => {
  const { uuid } = req.session;

  if (!uuid) {
    const errorRespObj = utils.err
      .handleErr(true, null, 'no uuid in session', '/bookings');
    return res.status(400).send(errorRespObj);
  }

  models.User.findById(uuid, (err, user) => {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'could not find user by id', '/bookings:models.User.findById');
      return res.status(400).send(errorRespObj);
    }
    res.send('200');
  });

})

router.post('/add-booking', (req, res) => {
  const { booking } = req.body;

  const uid = req.session.uuid;

  models.Artist.findById(uid, (err, artist) => {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'uid not in db', '/add-booking:models.Artist.findById');
      return res.status(400).send(errorRespObj);
    }

    artist.addBooking(booking, (err) => {
      if (err) {
        const errorRespObj = utils.err
          .handleErr(err, null, 'error adding booking', '/add-booking:artist.addBooking');
        return res.status(400).send(errorRespObj);
      }

      artist.save((err, artist) => {
        if (err) {
          const errorRespObj = utils.err
            .handleErr(err, null, 'Error saving model to db', '/add-booking:artist.save');
          return res.status(500).send(errorRespObj);
        }

        const data = { artistId: artist._id };
        const respObj = utils.resp.createRespObj(null, data, 'Booking added');
        res.send(respObj);
      });
    });
  });
});

export default router;
