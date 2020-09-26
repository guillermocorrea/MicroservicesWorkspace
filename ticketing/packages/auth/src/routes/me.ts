import express from 'express';

import { currentUser, requireAuth } from '@tinis/common';

const router = express.Router();

router.get('/api/users/me', currentUser, requireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as meRouter };
