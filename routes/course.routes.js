import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import courseModel from '../models/course.model.js';
import purchaseModel from '../models/purchase.model.js';

dotenv.config();

const courseRouter = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

courseRouter.get('/preview', async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

courseRouter.post('/purchase', authenticateUser, async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const purchase = await purchaseModel.create({
      userId: req.user.id,
      courseId: course._id,
      purchasedAt: new Date(),
    });

    res
      .status(201)
      .json({ message: 'Course purchased successfully', purchase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default courseRouter;
