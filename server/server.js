// server/server.js
require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const path          = require('path');
const cookieParser  = require('cookie-parser');

const connectDB     = require('./config/db');
const authRoutes    = require('./routes/authRoutes');
const incomeRoutes  = require('./routes/incomeRoutes');
const errorHandler  = require('./middleware/errorHandler');

// 1) connect to MongoDB
connectDB();

const app = express();

// 2) CORS – allow your React app to talk to this API
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// 3) body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4) serve uploaded receipts/invoices
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5) mount your API routers
app.use('/api/auth', authRoutes);
app.use('/api/incomes', incomeRoutes);

// 6) in production, serve React’s build folder
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// 7) generic error handler (returns JSON `{ message }`)
app.use(errorHandler);

// 8) start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`📡  API running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV})`)
);
