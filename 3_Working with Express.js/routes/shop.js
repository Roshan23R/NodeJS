const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//dirname gives path of file
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views','shop.html'));
  });
  
module.exports = router;