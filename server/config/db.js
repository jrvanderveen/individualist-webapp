const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

module.exports = {
    connectDB: async function (mongoURI, callback) {
        mongoose
            .connect(mongoURI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .then((x) => {
                console.log(`MongoDB Connected: ${mongoose.connections[0].host}`.cyan.underline.bold);
                return callback(null);
            })
            .catch((err) => {
                return callback(err);
            });
    },

    getConnection: function () {
        return mongoose.connection;
    },
};
