import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import adminModel from '../models/admin.model.js';
import courseModel from '../models/course.model.js';

dotenv.config();

const adminRouter = express.Router();

const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

adminRouter.post('/signup', async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const existingUser = await adminModel.findOne({
      email: validatedData.email,
    });
    if (existingUser)
      return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const newAdmin = await adminModel.create({
      ...validatedData,
      password: hashedPassword,
      role: 'admin',
    });

    res
      .status(201)
      .json({ message: 'Admin signup successful', adminId: newAdmin._id });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

adminRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email, role: 'admin' });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Signin successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

adminRouter.post('/course', authenticateAdmin, async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const course = await courseModel.create({
      title,
      description,
      price,
      createdBy: req.admin.id,
    });

    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

adminRouter.put('/course/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await courseModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json({ message: 'Course updated', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

adminRouter.get('/course/preview', async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default adminRouter;
