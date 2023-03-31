const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const serverConfig=require("./configs/server.config");
const dbConfig=require("./configs/db.config");
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to monogoDB ")
});
db.once("open", () => {
    console.log("Connected to mongoDB");
});
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
app.listen(serverConfig.PORT,()=>{
    console.log("server are running on the port number",+serverConfig.PORT);
})