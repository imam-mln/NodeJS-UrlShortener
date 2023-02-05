import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' });

const router = express.Router();

// Short URL Generator
router.post('/short', async (req, res) => {
  const { long_url } = req.body;
  const base = process.env.BASE;

  const id = nanoid(7);
  if (validateUrl(long_url)) {
    try {
      let url = await Url.findOne({ long_url });
      if (url) {
        res.json(url);
      } else {
        const short_url = `${base}/${id}`;

        url = new Url({
          long_url,
          short_url,
          id
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

export default router;
