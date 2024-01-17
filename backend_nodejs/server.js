require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const boothRouter = require('./routers/boothRouter');
const authRouter = require('./routers/authRouter');
const PORT = process.env.PORT || 3000
const uri = process.env.mongoDBURL;

const app = express();
  
app.use(cors());

app.use(express.json());

app.use('/api/booths', boothRouter);
app.use("/auth", authRouter);
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const start  = async() => {
    try{
        await mongoose.connect(uri)
        app.listen(PORT, ()=>{
            console.log(`server started on port ${PORT}`)
        })
    }catch(e){
        console.log(e);
    }
}
start();