const express = require('express');
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

const router = express.Router();

userRouter
.route('/')
.get(getAllUsers)
.post(createUser);

userRouter.route('/:id')
.get(getUsers)
.patch(updateUser)
.delete(deleteUser);

module.exports = router
