const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.post('/', categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getOneCategory);
router.put('/:id', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;