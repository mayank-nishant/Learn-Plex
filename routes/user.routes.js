import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userRouter = express.Router();

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

userRouter.post('/signup', async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await userModel.create({
      ...validatedData,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Signup Successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }

    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Signin Successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

userRouter.get('/purchases', async (req, res) => {
  try {
    res.json({ success: true, message: 'User purchases endpoint' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default userRouter;
