const app = require('./app')

require("dotenv").config();
const PORT = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`🪨 Listening on port ${PORT} 💎 `);
});