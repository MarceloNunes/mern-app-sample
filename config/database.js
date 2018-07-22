import mongoose from 'mongoose';
import config from './config';

export default {
  connect: () => {
    const userId = config.mongoose.username ?
      `${config.mongoose.username}:${encodeURIComponent(config.mongoose.password)}@` : '';

    const serverPort = config.mongoose.port || '27017';

    const url = `mongodb://${userId}${config.mongoose.hostname}:${serverPort}/${config.mongoose.dbname}`;

    mongoose.Promise = global.Promise;

    mongoose.connect(url, { useNewUrlParser: true })
      .then(() => {
        console.log(`Sucessfully connected to MongoDB server on port ${serverPort}`);
      }).catch((error) => {
        console.log(error);
      });
  },
};
