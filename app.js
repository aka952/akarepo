const express = require('express');
const app = express();
const gistRoute = require('./routes/gists');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/gist',gistRoute)

app.listen(3000, () => console.log("Listening on Port 3000"));