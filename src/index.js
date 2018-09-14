import express from 'express';
import path from 'path';


////////////////////////////////////////////////////////////////////////////
// Server Setup                                                                       
////////////////////////////////////////////////////////////////////////////
const app = express();
const port = 1337;
app.listen(port, () => console.log(`Listening on port ${port}`))


////////////////////////////////////////////////////////////////////////////
// Middleware                                                                       
////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.resolve(__dirname, './static')));


////////////////////////////////////////////////////////////////////////////
// App Routes                                                                       
////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static'));
});


////////////////////////////////////////////////////////////////////////////
// Api Routes                                                                       
////////////////////////////////////////////////////////////////////////////
const api = express.Router();
app.use('/api', api);

api.get('/', (req, res) => {
  res.send('Hello API');
});
