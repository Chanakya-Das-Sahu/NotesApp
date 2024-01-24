// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectToMongo = require('./db.js');
// const userRoutes = require('./routes/userRoutes');
// // const noteRoutes = require('./routes/noteRoutes');
// const port = 3000 ;

// const app = express();
// connectToMongo();

// app.use(bodyParser.json());
// app.use(cors());

// app.use('/user',userRoutes)
// // app.use('/note',noteRoutes)

// app.listen(port,()=>{
//     console.log(`server is listening on the port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectToMongo = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes'); // Import your noteRoutes
const port = 3000;

const app = express();
connectToMongo();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/note', noteRoutes); // Use /note as the base path for noteRoutes

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
