require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./utils/db');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected ✅');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error('Unable to connect to DB ❌', err));
