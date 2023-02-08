const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/manualAuthentication');
const db = mongoose.connection;
db.on('error', function () {
    console.error('Error : Connecting MongoDb');
});
db.once('open', function () {
    console.log('Connected to DataBase successfully');
});
module.exports = db;