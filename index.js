import express from 'express';
import dotenv from 'dotenv'

dotenv.config({ path: '/.env' })

import userRouter from './routes/user.routes.js';
import courseRouter from './routes/course.routes.js';
import adminRouter from './routes/admin.routes.js';
import connectDB from './db.js';

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

