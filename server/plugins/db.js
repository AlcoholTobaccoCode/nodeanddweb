module.exports = app => {

  const mongoose = require('mongoose');

  mongoose.connect('mongodb://admin:123456@localhost:27017/node-vue-moba?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useNewUrlParser: true
  });

}