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

const port = 3000;

app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
