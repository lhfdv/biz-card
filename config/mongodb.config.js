const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
).then(() => console.log('Conectado com o banco de dados'));


