const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const rootRouter=require("./routes/index")
const { ConnectDB }= require("./db/db");
dotenv.config();
const app=express();

ConnectDB();
app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.get('/',(req,res)=>{
    res.json({
        message:"hello"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})