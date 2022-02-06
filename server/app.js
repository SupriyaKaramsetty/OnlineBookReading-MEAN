const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bookRoutes = require("./routes/book");
const genreRoutes = require("./routes/genre");
const userRoutes = require("./routes/user");
const reviewRoutes = require('./routes/review');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,}
)

.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors());
app.use('/user',userRoutes);
app.use('/book',bookRoutes);
app.use('/genre',genreRoutes);
app.use('/review',reviewRoutes);

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
});