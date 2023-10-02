const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res
  .status(200)
  .json({ message:"This is the server", app: "Touring App" });
});

app.post('/', (req, res) => {
 res.send("We'll post to this endpoint")
})

app.put('/update', (req, res) => {
   res.send('We update data here baby!')

});

const port = 3000;

app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
