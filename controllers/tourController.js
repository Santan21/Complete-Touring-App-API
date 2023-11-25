const fs = require('fs');
const tourRouter = require('../routes/tourRoutes');
const filePath = "/Users/mac/Desktop/BE/Touring App/assets/data/tours-simple.json";
const tours = JSON.parse(fs.readFileSync(filePath, "utf-8"));

exports.checkID = (req, res, next, val) => {
  console.log('Tour id is ${val}');
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
  return res.status(404).json({
  status: 'fail',
  message: "Missing name or price"
  });
};


exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
      status: "Success",
      requestedAt: req.requestTime,
      data: {
        results: tours.length,
        tours,
      },
    });
  };

  exports.getTours = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    //if (id > tours.length) {
    res.status(200).json({
      status: "Success",
      data: { tour },
    });
  };

  exports.createTours = (req, res) => {
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

  exports.updateTour = (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        tour: "<Updated Tour>",
      },
    });
  }
  
  exports.deleteTour = (req, res) => {
    res.status(200).json({
      status: "success",
      data: null,
    });
  }
  