const express = require('express');
const database=require("../database/connection")
const restaurantRoutes = require('../routes/restaurant')
const categoryRoutes = require('../routes/category')
const menuItemRoutes = require('../routes/menu');
const PORT = 3000;

const app = express();
const cors=require("cors")


app.use(express.json());
app.use(cors())
// server configuration
app.use('/api', restaurantRoutes)
app.use('/api', categoryRoutes)
// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
module.exports=app