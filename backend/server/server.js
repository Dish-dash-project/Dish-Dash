const express = require('express');
const PORT = 3000;

const app = express();
const cors = require("cors");
const database = require("../database/connection");
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