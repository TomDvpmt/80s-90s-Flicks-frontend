const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        const conn = mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("============== App connected to MongoDB ==============");

    } catch (error) {
        console.log("==================== Unable to connect to MongoDB : ", error, "======================");
        process.exit(1);
    }
}


module.exports = connectToDb;