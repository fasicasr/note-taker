// Dependencies

const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uniqid = require('uniqid');

//const uniqid = require('uniqid');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(express.json());


// Routes 

// Route that sends the user to local route, saved route(notes) and the db.json file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));


// Sets the post API route - takes in JSON input
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;
    
   newNote.id = uniqid();
   db.push(newNote)
  
  fs.writeFile('./db/db.json', JSON.stringify(db), err => 
        err ? console.log(err) : console.log('Generating ReadMe!'));

  res.json(newNote.id);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
