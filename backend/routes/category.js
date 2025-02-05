const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.post('/categories', categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getOneCategory);
router.put('/categories/:id', categoryController.editCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;