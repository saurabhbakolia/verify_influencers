import { Express } from 'express';
import { discoverInfluencer, getInfluencers } from '../controllers/influencerController';
import express from 'express';

const router = express.Router();

router.post('/discover', discoverInfluencer); // Fetch tweets, transcripts
router.get('/', getInfluencers); // Fetch all influencers

export default router;