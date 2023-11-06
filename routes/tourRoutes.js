const express = require('express')

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

const tourRouter = express.Router();

tourRouter
.route('/')
.get(getAllTours)
.post(createTours);

tourRouter
.route('/:id')
.get(getTours)
.patch(updateTour)
.delete(deleteTour);

module.exports = router;