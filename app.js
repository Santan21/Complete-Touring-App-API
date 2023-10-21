const fs = require("fs");
const express = require("express");
const app = express();
const filePath =
  "/Users/mac/Desktop/BE/Touring App API/assets/data/tours-simple.json";

app.use(express.json());

app.use((req, res, next) => {
  console.log('Middleware here');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date(). toISOString();
  next();
})

const tours = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    data: {
      results: tours.length,
      tours,
    },
  });
};

const getTours = (req, res) => {
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
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated Tour>",
    },
  });
}
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
}
//app.post('/api/v1/tours', createTours);
//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTours);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTours);

app
.route('/api/v1/tours/:id')
.get(getTours).patch(updateTour)
.delete(deleteTour);

const port = 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
