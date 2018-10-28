const express = require("express")
const router = express.Router()
const todo = require('./todoHandler')
const {verifyCookie} = require('../../middlewares/authMiddleware')
var upload = require('../../middlewares/upload')

router.post('/', verifyCookie, upload, todo.addNewTodo)
router.get('/', verifyCookie, todo.getTodo)
router.patch('/', verifyCookie, upload, todo.updateTodo)
router.delete('/', verifyCookie, todo.deleteTodo)

module.exports = router
