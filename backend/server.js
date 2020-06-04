//imports
const express = require(`express`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);
require(`dotenv`).config();

//linking the app routes
const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const tagRouter = require("./routes/tag");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DATABASE CONNECTED ->>`));


//middlewares
app.use(morgan(`dev`));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


//cors
// app.use(cors())
if (process.env.NODE_ENV == `development`) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
  console.log(process.env.CLIENT_URL);
}

//beinging in the app routes
app.use("/api",blogRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", tagRouter);


//port to run on and listen on
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});
