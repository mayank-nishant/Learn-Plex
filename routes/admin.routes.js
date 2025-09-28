import express from "express"
const Router = express.Router();

const adminRouter = Router;

adminRouter.post('/signup', (req, res) => {
  res.send('adminRouter signup');
});

adminRouter.post('/signin', (req, res) => {
  res.send('adminRouter signin');
});

adminRouter.post('/course', (req, res) => {
  res.send('adminRouter course');
});

adminRouter.put('/course', (req, res) => {
  res.send('adminRouter course info change');
});

adminRouter.post('/course/preview', (req, res) => {
  res.send('adminRouter all course preview');
});

export default adminRouter;