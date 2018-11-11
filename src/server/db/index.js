import mongoose from 'mongoose';
import env from '../env';

const connectionStr = `mongodb://${env.db.user}:${env.db.pwd}@ds259802.mlab.com:59802/knvs-db`;
mongoose.connect(connectionStr, { useNewUrlParser: true });

// const dbCall = (cb) => {
//   const db = mongoose.connection;
//   db.on('error', () => console.error('connection error:'));
//   db.once('open', () => {
//     cb();
//   });
// };

export default mongoose;
