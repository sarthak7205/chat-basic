const express=require('express')
const log= require('./routes/login')
const app=express();

app.use(log)
app.use((req,res,next)=>{
    res.status(404).send("page not found")
})
app.listen(3000)