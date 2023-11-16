const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')
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
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//SERVER
const port = 3001;
app.listen(port, () => {
  console.log("App running on port ${port}.... ");
});
