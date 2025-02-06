const express = require('express');
const router = express.Router();
const menuItemController = require('../controller/menu');

router.post('/', menuItemController.addMenuItem);
router.get('/', menuItemController.getAllMenuItems);
router.get('/:id', menuItemController.getOneMenuItem);
router.put('/:id', menuItemController.editMenuItem);
router.delete('/:id', menuItemController.deleteMenuItem);

module.exports = router;
