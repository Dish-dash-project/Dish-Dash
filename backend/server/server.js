const express = require('express');
const PORT = 3000;

const app = express();

const seedDatabase = require('../database/seeds');
// seedDatabase()
const db=require("../database/connection")


async function initializeDatabase() {
  try {
      await db.connection.sync({force: true});
      await seedDatabase();
      console.log('Database initialized successfully');
  } catch (error) {
      console.error('Database initialization failed:', error);
  }
}
// initializeDatabase()

const cors = require("cors");

app.use(express.json());
app.use(cors());
// server configuration
// app.use('/api', restaurantRoutes)
// app.use('/api', categoryRoutes)
// make the server listen to requests
require('dotenv').config();
const userRoutes = require("../routes/user");

app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
module.exports = app;
module.exports=app  