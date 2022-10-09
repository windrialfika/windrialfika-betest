const mongoose = require("mongoose");

const dbName = "db_windri_betest";
//const serverUri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const serverUri = 'mongodb+srv://windrialfika:qJGQtBLJ47pqBMdx@cluster0.d3n8prz.mongodb.net';


class dbConnection {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose
            .connect(`${serverUri}/${dbName}`, { useNewUrlParser: true })
            .then(() => {
                console.log("Database connection successful");
            })
            .catch(err => {
                console.error(`Database connection error on proses ${serverUri}/${dbName}`);
                console.log(err);
            });
    }
}

module.exports = new dbConnection();