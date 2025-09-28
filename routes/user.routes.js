import express from 'express';
const Router = express.Router();

const userRouter = Router;

userRouter.post('/signup', (req, res) => {
  res.send('user signup');
});

userRouter.post('/signin', (req, res) => {
  res.send('user signin');
});

userRouter.get('/purchases', (req, res) => {
  res.send('user purchases');
});

export default userRouter;
