const express = require("express");
const {json} = require("express");
const connect = require("./config/db");
const userRouter = require("./router/todoRouter");
const app = express();
connect();
app.use(json())
app.use("/todo",userRouter)

const PORT = process.env.PORT || 3000;

app.get("/", (req,res) =>{
    res.send("welcome to express and mongo back end work");
})

app.listen(PORT, () =>{
    console.log(`server is running at port ${PORT}`)
})