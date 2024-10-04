const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!! SHUTTTIING DOWNN');
  console.log(err.name, err.message);
  console.error(err);
  process.exit(1); //1=uncaught exception
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNNECTION SUCCESSFULL!'));

//console.log(process.env);
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`app runnning on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION!!! SHUTTTIING DOWNN');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1); //1=uncaught exception
  });
});
