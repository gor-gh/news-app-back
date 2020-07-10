const router = require('express').Router();
const newsController = require('../controllers/newsController');
const newsRoutes = require('./newsRoutes');

router.use('/news', newsRoutes);





module.exports = router;


