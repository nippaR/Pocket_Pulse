// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
      // Mongoose 6+ no longer needs useCreateIndex or useFindAndModify
    });

    console.log(
      `MongoDB connected to ${mongoose.connection.host}:${mongoose.connection.port} ✅`
    );
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
