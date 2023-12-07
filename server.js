const dotenv =  require('dotenv');
const app = require('./app');
console.log(process.env);

//SERVER
const port = 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});