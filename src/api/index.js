const connectDB = require("../database/connect");
const Api = require("./api");

const Main = async () => {
    await Api()
    await connectDB();
}

Main(); 