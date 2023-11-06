const tourRouter = express.Router();
const express = require('express')
tourRouter
.route('/')
.get(getAllTours)
.post(createTours);

tourRouter
.route('/:id')
.get(getTours)
.patch(updateTour)
.delete(deleteTour);