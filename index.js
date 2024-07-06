const express=require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("GFG API Listenning || By Shariq");
})

app.get('/:userName', async (req, res) => {
    try{
        const userName = req.params.userName;
    }
    catch{

    }
    res.send("GFG API Listening || By Shariq");
})

app.listen(3000,()=>{
    console.log("GFG API Listening on PORT 3000");
});