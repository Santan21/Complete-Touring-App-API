const express = require('express');
const filePath = "/Users/mac/Desktop/BE/Touring App/assets/data/tours-simple.json";
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

module.exports = tourRouter;