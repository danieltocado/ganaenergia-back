const mongoose = require("mongoose");

const db = mongoose.connect('mongodb+srv://admin:1234@cluster0-blmkj.mongodb.net/ganaenergia?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }).then(() => console.log('>>> SUCCESFULLY CONNECTED TO MongoDB.'))
    .catch(console.error)

module.exports = db;