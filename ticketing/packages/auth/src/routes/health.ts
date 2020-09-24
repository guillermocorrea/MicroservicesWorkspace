import express from 'express';

const router = express.Router();

router.get('/api/users/health', (req, res) => {
  return res.send('healthy');
});

export { router as healthRouter };
