import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log("Connected"))
.catch(err => {
  console.log(err.message);
});

app.use('/api/user', userRoutes );
app.use('/api/auth', authRoutes );

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error!';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});