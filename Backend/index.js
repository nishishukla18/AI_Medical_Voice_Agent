import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import aiRoutes from './routes/aiRoutes.js';

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Public endpoint
app.get('/', (req, res) => {
  res.send("API working");
});

// API routes (NO auth)
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

