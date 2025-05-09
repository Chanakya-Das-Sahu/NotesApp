const express = require('express');
const connectToMongo = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 3000;
// middlewares 

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsConfig = {
  origin: ['http://localhost:5174','http://localhost:5173','https://chanakya-notesapp.netlify.app','https://mindfuel-jade.vercel.app'] ,
  credentials: true 
}



app.use(cors(corsConfig))

// Routes

app.use('/user', userRoutes);
app.use('/note', noteRoutes);

connectToMongo();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
