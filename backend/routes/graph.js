const express = require('express');
const router = express.Router();
const GraphController = require('../controllers/graph');

router.post('/', GraphController.plotGraph);


module.exports = router;