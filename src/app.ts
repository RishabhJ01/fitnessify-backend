const dotenv=require("dotenv");
dotenv.config();
import express from 'express';
const mongoose=require('mongoose');
const axios = require('axios');

const gptRoutes=require('./routes/chatgpt.js');
const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use("/gpt",gptRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});




