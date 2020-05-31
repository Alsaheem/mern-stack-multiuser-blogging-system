//imports
const express = require(`express`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);
require(`dotenv`).config();


//app
const app = express()

//middlewares
app.use(morgan(`dev`))
app.use(bodyParser.json())
app.use(cookieParser())


//cors
app.use(cors())


//first route
app.get('/', (req, res) => {
  res.send({time: Date().toString()})
})


//port to run on and listen on
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});