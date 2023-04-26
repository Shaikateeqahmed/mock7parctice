const express = require("express");
const cors = require("cors");
const {connection} = require("./config/connection.js");
const {user} = require("./routes/userroute.js");
const {authenticate} =require("./middleware/authenticaiton.js");
const {note} =require("./routes/notesroute.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user",user);
app.use(authenticate);
app.use("/note",note);


app.listen(process.env.port,async()=>{
    await connection;
    console.log(`server is running on port ${process.env.port}`);
})