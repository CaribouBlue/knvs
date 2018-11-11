import mongoose from 'mongoose';
import utils from '../../utils';

const artistSchema = new mongoose.Schema({
  name: String,
  bookings: mongoose.Schema.Types.Mixed,
});

/*
  bookings schema:
    {
      [dateStr]: [booking]
    }

  booking schema:
    {
      title: String,
      date: String,
      startTime: String,
      endTime: String,
    }
*/

artistSchema.methods.addBooking = function(booking, cb) {
  if (!booking.title || !booking.date || !booking.startTime || !booking.endTime) {
    const errorRespObj = utils.err
      .handleErr(true, null, 'invalid booking obj, check schema', 'artistSchema.methods.addBooking')
    return cb(errorRespObj);
  }

  if (!this.bookings) this.bookings = {};

  const dateId = booking.date.replace(/[-]/g, '');
  if (!this.bookings[dateId]) this.bookings[dateId] = [booking];
  else this.bookings.push(booking);

  return cb(null);
}

export default mongoose.model('artist', artistSchema);
