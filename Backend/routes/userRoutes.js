const express = require('express');
const asynchHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const authTokenGenerator = require('../utils/authTokenGenerator');

const userRouter = express.Router();

// Create user
userRouter.post(
  '/',
  asynchHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: authTokenGenerator(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

// Login user
userRouter.post(
  '/login',
  asynchHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: authTokenGenerator(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid login credentials');
    }
  })
);

// Get profile
userRouter.get(
  '/profile',
  authMiddleware,
  asynchHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('books');
    if (!user) {
      res.status(404);
      throw new Error(`You don't have any profile yet`);
    }
    res.status(200).json(user);
  })
);

// Update profile
userRouter.put(
  '/profile/update',
  authMiddleware,
  asynchHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: authTokenGenerator(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);

// Fetch all users
userRouter.get(
  '/',
  asynchHandler(async (req, res) => {
    const users = await User.find().populate('books');
    res.status(200).json(users);
  })
);

module.exports = userRouter;  // Correct export of router
