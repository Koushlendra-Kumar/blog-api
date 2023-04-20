const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//Database connection setup
const mongodb_uri = process.env.MONGODB_URI || 'mongodb+srv://portfolioblogdefault:defaultblogPortfolio@portfolio-blog-default.zorslld.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.log('Error occurred while connecting to the database.', err))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));