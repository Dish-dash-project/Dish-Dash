const express = require('express');
const router = express.Router();
const advancedSearchController = require('../controller/advancedSearch');

// Define the route for advanced search
router.get('/', advancedSearchController.advancedSearch);

module.exports = router;