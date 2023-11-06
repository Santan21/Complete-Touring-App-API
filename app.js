const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const filePath =
  "/Users/mac/Desktop/BE/Touring App API/assets/data/tours-simple.json";

const app = express();

//MIDDLEWARES HERE
app.use(morgan('dev'));

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

//ROUTE HANDLERS HERE

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

const getAllUsers = (req, res) => {
     res.status(500).json({
      status: 'error',
      message: 'this route is not defined yet'
     })
};

const createUser = (req, res) => {
  res.status(500).json({
   status: 'error',
   message: 'this route is not defined yet'
  })
};

const getUsers = (req, res) => {
  res.status(500).json({
   status: 'error',
   message: 'this route is not defined yet'
  })
};

const updateUser = (req, res) => {
  res.status(500).json({
   status: 'error',
   message: 'this route is not defined yet'
  })
};

const deleteUser = (req, res) => {
  res.status(500).json({
   status: 'error',
   message: 'this route is not defined yet'
  })
};

//ROUTES - TOURS
app.use('/api/v1/tours', tourRouter)
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

//ROUTES - USERS

app
.route('/api/v1/users')
.get(getAllUsers)
.post(createUser);

app.route('/api/v1/users/:id')
.get(getUsers)
.patch(updateUser)
.delete(deleteUser);

//SERVER
const port = 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
