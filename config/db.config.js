const mongoose = require("mongoose");

const dbName = "db_windri_betest";
const serverUri = process.env.DATABASE_URL || "127.0.0.1:27017";


class dbConnection {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose
            .connect(`mongodb://${serverUri}/${dbName}`, { useNewUrlParser: true })
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