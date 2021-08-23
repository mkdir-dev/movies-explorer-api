const { NODE_ENV, PROD_DB } = process.env;
const DEV_DB = 'mongodb://localhost:27017/bitfilmsdb';

module.exports.URL_DB = NODE_ENV === 'production' ? PROD_DB : DEV_DB;

module.exports.SETUP_DB = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};