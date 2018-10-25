const express = require("express");
const router = express.Router();
const todo = require('./todoHandler');
const {verifyCookie} = require('../../middlewares/authMiddleware');

router.post('/', verifyCookie, todo.addNewTodo);
// router.get('/', verifyCookie, todo.getTodo);
// router.patch('/', verifyCookie, todo.updateTodo);
// router.delete('/', verifyCookie, todo.deleteTodo);

module.exports = router;
