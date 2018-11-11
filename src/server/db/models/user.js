import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import models from './';
import utils from '../../utils';


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  _artistId: mongoose.Schema.Types.ObjectId,
});

userSchema.methods.addPassword = function(pwd, cb) {
  const saltRounds = 10;
  bcrypt.hash(pwd, saltRounds, (err, hash) => {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'error hashing password', 'userSchema.methods.addPassword');
      return cb(errorRespObj);
    }

    this.password = hash;

    return cb(null);
  });
}

userSchema.methods.checkPassword = function(pwd, cb) {
  bcrypt.compare(pwd, this.password, function(err, res) {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'error comparing passwords', 'userSchema.methods.checkPassword');
      return cb(errorRespObj);
    }

    return cb(null, res);
  });
}

userSchema.methods.assignArtist = function(name, cb) {
  const artist = new models.Artist({ name });

  artist.save((err, artist) => {
    if (err) {
      const errorRespObj = utils.err
        .handleErr(err, null, 'Error saving model to db', '/create:artist.save');
      cb(errorRespObj);
    }

    this._artistId = artist._id;

    cb(null);
  });
}

export default mongoose.model('user', userSchema);
