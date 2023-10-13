const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const { db } = require("./mongoDB/db.js");
const app = express();

const userRouter = require("./routes/users.js");
const placeRouter = require("./routes/place.js");
const bookingRouter = require('./routes/booking.js')

dotenv.config();
app.use(cookieParser())
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,POST,PUT,DELETE',
  credentials: true,
};

app.options ('*',cors ())
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/user", userRouter);
app.use("/place", placeRouter);
app.use("/bookPlaces", bookingRouter);

db(process.env.MONGO_URL);

app.listen(5000, () => {
  console.log('Server is running at port 5000!');
});

