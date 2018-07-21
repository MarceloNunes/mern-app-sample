import path from 'path';
import express from 'express';

import config from './config/config';
import database from './config/database';
import backend from './backend/backend';

const app = express();

database.connect();

const publicPath = path.join(__dirname, 'frontend', 'web', 'public');
const port = process.env.PORT || config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

backend(app);

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});