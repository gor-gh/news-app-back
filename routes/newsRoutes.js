const router = require('express').Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getAllNewses);
router.get('/categories', newsController.getNewsCategories);
router.post('/create', newsController.createNews);


module.exports = router;