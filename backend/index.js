// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectToMongo = require('./db.js');
// const userRoutes = require('./routes/userRoutes');
// const noteRoutes = require('./routes/noteRoutes'); // Import your noteRoutes
// const cookieParser = require('cookie-parser');
// const port = process.env.port || 3000;

// const app = express();
// connectToMongo();
// app.use(cookieParser())
// app.use(bodyParser.json());
// // app.use(cors());
// app.use(cors());

// app.use(express.json());
// app.use('/user', userRoutes);
// app.use('/note', noteRoutes); // Use /note as the base path for noteRoutes

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/user', userRoutes);
app.use('/note', noteRoutes);

// Database connection
connectToMongo();

// Server listening
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// const express = require('express');
// const cors = require('cors');
// const connectToMongo = require('./db.js');
// const userRoutes = require('./routes/userRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const cookieParser = require('cookie-parser');

// const port = process.env.PORT || 3000;

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Adjust the origin to match your client's address
//   credentials: true // Allow cookies to be sent cross-origin
// }));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/user', userRoutes);
// app.use('/note', noteRoutes);

// // Database connection
// connectToMongo();

// // Server listening
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
