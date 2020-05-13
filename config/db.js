const mongoose = require("mongoose");

const connectDB = async (mongoURI) => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
};

module.exports = connectDB;
