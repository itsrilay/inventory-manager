import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import apiRouter from './routes/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', apiRouter);

// Serve the built React app
// This should be after all API routes
app.use(express.static(path.join(__dirname, '..', 'client/dist')));

// For all other requests, send the index.html file for client-side routing
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/dist', 'index.html'));
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
