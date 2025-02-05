const express = require('express');
const router = express.Router();
const menuItemController = require('../controller/menu');

router.post('/menu-items', menuItemController.addMenuItem);
router.get('/menu-items', menuItemController.getAllMenuItems);
router.get('/menu-items/:id', menuItemController.getOneMenuItem);
router.put('/menu-items/:id', menuItemController.editMenuItem);
router.delete('/menu-items/:id', menuItemController.deleteMenuItem);

module.exports = router;
