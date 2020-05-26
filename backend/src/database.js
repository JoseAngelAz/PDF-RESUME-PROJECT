const mongoose = require('mongoose');

//const URI = process.env.MONGOcDB_URI ? process.env.MONGODB_URI:'mongodb://localhost/resumesdb';

mongoose.connect(process.env.URLDB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('DB IS CONNECTED');
})