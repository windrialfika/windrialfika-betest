const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
require("./config/db.config")
require("./config/redis.config")


const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server started and running on port ${PORT}`);
})