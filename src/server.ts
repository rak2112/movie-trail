import app from './app';



// const keys = require('./config/keys');
// import * as cacheService from './services/cache';
// require('./services/cache');

// const router = express.Router();


// Load environment variables from .env file, where API keys and passwords are configured



// // API keys and Passport configuration
// import * as passportConfig from './services/passport';




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

export default app;