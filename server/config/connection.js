const mongoose = require('mongoose');

const PORT = process.env.PORT

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/brewtools_db',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

// mongoose.connect(PORT ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/brewtools_db');

module.exports = mongoose.connection;