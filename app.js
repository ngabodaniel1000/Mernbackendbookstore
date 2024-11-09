const express = require('express')
const app = express()
const dotenv = require("dotenv");
const cors = require("cors")
const connectDb = require("./db/dbconnection")
const User = require("./model/model")
const Routes = require("./router/routes")
const bodyparser = require("body-parser")
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config({ path: './config.env' });
connectDb();
const port = process.env.PORT || 2003

app.use(cors({
    origin:["http://localhost:2000","https://backend-bookstore-9xux.onrender.com"],
    credentials:true
}))
// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGOURI, 
    }),
    cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.COOKIE_DOMAIN, // Add this for cross-domain cookies
    maxAge: 24 * 60 * 60 * 1000
  },
  }));

app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', Routes)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
