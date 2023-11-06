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




//ROUTES - USERS

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//SERVER
const port = 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
