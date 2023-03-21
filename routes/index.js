import express from 'express';
import NodeCache from 'node-cache';
import Url from '../models/Url.js'

const router = express.Router();
const cache = new NodeCache();

router.get('/:urlId', async (req, res) => {
  try {
    //caching solution
    const cacheUrl = cache.get(req.params.urlId)
    if (cacheUrl) {
      console.log("Retrieving URL from cache")
      await Url.updateOne(
        { urlId: req.params.urlId },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(cacheUrl);
    }

    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      console.log('Retrieving URL from database');
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      cache.set(req.params.urlId, url.originalUrl,3600);
      return res.redirect(url.originalUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;
