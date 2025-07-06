require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./utils/db');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Connect DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected ✅');
    return sequelize.sync(); // อาจใช้ { force: true } สำหรับ dev เท่านั้น
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error('Unable to connect to DB ❌', err));
