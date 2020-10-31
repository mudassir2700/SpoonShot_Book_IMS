const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const books = require('./routes/api/books');
const cors = require('cors');
//Body Parser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

//DB config

const db = require('./config/keys.js').mongoURI;

//connect to MongoDb
mongoose.connect(process.env.MONGO_URI || db);
// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});

// Routes
app.use('/api/books',books);

// Serve Static assets in production

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client','build','index.html'));
    });

    
}

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server started on port ${port}`));