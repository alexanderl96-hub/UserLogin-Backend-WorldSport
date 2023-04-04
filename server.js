const app = require('./app')

require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV;

app.listen(NODE_ENV, () => {
  console.log(`🪨 Listening on port ${NODE_ENV} 💎 `);
});