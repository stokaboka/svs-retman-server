import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express !!!' });
  res.send('Hello! I am a Mapper server.');
});

export default router;
