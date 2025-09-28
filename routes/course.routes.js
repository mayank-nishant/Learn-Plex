import express from 'express';
const Router = express.Router();

const courseRouter = Router;

courseRouter.get('/preview', (req, res) => {
  res.send('all courses');
});

courseRouter.post('/purchase', (req, res) => {
  res.send('course purchase');
});

export default courseRouter;
