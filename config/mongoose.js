const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development',{ useNewUrlParser: true ,useUnifiedTopology: true});

const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;