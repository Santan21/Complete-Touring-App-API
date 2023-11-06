const userRouter = express.Router();
const express = require('express');

userRouter
.route('/')
.get(getAllUsers)
.post(createUser);

userRouter.route('/:id')
.get(getUsers)
.patch(updateUser)
.delete(deleteUser);
