import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/:id', async (req, res) => {
  try {
    const url = await Url.findOne({ id: req.params.id });
    if (url) {
      await Url.updateOne(
        {
          id: req.params.id,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.long_url);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;
