const fs = require("fs");
const express = require("express");
const app = express();
const filePath =
  "/Users/mac/Desktop/Backend Engineering/Touring App API/assets/data/tours-simple.json";

app.use(express.json());
const tours = JSON.parse(fs.readFileSync(filePath, "utf-8"));
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      results: tours.length,
      tours,
    },
  });
});

const getAllTours = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //if (id > tours.length) {
    if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "Success",
    data: { tour },
  });
}; 
app.get("/api/v1/tours/:id", getAllTours);



const createTours = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(filePath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  });
}
app.post("/api/v1/tours", createTours);



app.patch('/api/v1/tours/:id', (req,res) => {
  if ( req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>'
    }
  });
});


app.delete('/api/v1/tours/:id', (req,res) => {
  if ( req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: 'success',
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
