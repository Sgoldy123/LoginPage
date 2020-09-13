const express = require("express");
const path = require("path");
const app = express();
const port = 80;

const bodyparser=require("body-parser");


//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/page', {useNewUrlParser: true});

//mongoose schema
const contactdance = new mongoose.Schema({
    email: String,
    password: String
  });

  const cdance = mongoose.model('item', contactdance);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
   
    const params = {};
    res.status(200).render('home.pug', params);
})


app.post('/', (req, res)=>{
    
    var mydata=new cdance(req.body);
    mydata.save().then(()=>{
        res.send("submitted")
    }).catch(()=>{
        res.status(404).send("not Submitted");
    })

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});