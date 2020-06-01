//imports
const express = require(`express`);
const morgan = require(`morgan`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);
require(`dotenv`).config();

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

//linking the app routes
const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth");

//beinging in the app routes
app.use(express.json());
app.use("/api",blogRouter);
app.use("/api",authRouter);

//middlewares
app.use(morgan(`dev`));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV == `development`) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}


//port to run on and listen on
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});
