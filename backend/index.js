const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongo = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes'); // Import your noteRoutes
const port = process.env.port || 3000;

const app = express();
connectToMongo();

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/note', noteRoutes); // Use /note as the base path for noteRoutes

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
