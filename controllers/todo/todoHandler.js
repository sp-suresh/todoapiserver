var {serverError, clientError, success} = require('../../middlewares/basicResHandler')
var {todoDb, ObjectId, isValidObjectIdStr} = require('../../lib/mongoDbClient')
const {attFileLoc, attRoute, serverHost} = require('../../keys')
var fs = require('fs')

async function addNewTodo(req, res){
  try{
    var body = req.body
    if(!Object.keys(req.body).length){
      return clientError(res, 'Please specify a valid req body')
    }

    var todoDesc = body.desc || ""
    if(typeof todoDesc !== 'string' || !todoDesc.length){
      return clientError(res, 'Please specify a valid todo description')
    }
    var todoDoc = {
      uid: req.user.idx,
      desc: todoDesc,
      isa: 1,
      fileNm: null
    }
    if(req.file){
      todoDoc.fileNm = req.file.filename
    }

    todoDoc.ets = Date.now()
    var insertedDoc = await todoDb.insertDocument('todos', todoDoc)
    if(insertedDoc.result.n === 1 && insertedDoc.result.ok === 1){
      success(res)
    }
    else{
      serverError(res, 'No todo record was inserted')
    }
  }
  catch(e){
    serverError(res, e)
  }
}

async function getTodo(req, res){
  try{
    var qs = req.query
    
    var lmt = parseInt(qs.lmt) || 10
    var off = parseInt(qs.off) || 0
    var uid = req.user.idx

    if(typeof off != 'number' || typeof lmt != 'number' || isNaN(off) || isNaN(lmt)){
      return clientError(res, 'Please specify a valid query string parameters')
    }

    var ttc = await todoDb.getDocumentCountByQuery('todos', {uid, isa: 1})

    var todoList = await todoDb.findDocFieldsByFilter('todos', {uid}, {uid: 0}, lmt, off, {ets: 1})

    success(res, {ttc, todoList, fileHost: `${serverHost}/${attRoute}`})
  }
  catch(e){
    serverError(res, e)
  }
}

async function updateTodo(req, res){
  try{
    var body = req.body

    if(!Object.keys(req.body).length){
      return clientError(res, 'Please specify a valid req body')
    }

    var todoDesc = body.desc || ""
    if(typeof todoDesc !== 'string' || !todoDesc.length){
      return clientError(res, 'Please specify a valid todo description')
    }

    var id = body.id || ''

    if(typeof id != 'string' || !id.length || !isValidObjectIdStr(id)){
      return clientError(res, 'Please specify a valid todo id in query string')
    }

    var todoDoc = {
      desc: todoDesc,
      fileNm: null
    }

    if(req.file){
      todoDoc.fileNm = `${req.file.filename}`
    }

    var oldFile = await todoDb.findDocFieldsByFilter('todos', {_id: ObjectId(id), uid: req.user.idx}, {fileNm: 1, _id: 0}, 1)

    if(oldFile && oldFile.length && oldFile[0].fileNm){
      fs.unlink(`${attFileLoc}/${oldFile[0].fileNm}`)
    }

    var updateAck = await todoDb.findOneAndUpdate('todos', {_id: ObjectId(id), uid: req.user.idx}, todoDoc)

    if(updateAck.lastErrorObject.n){
      success(res, {msg: 'todo updated successfully!'})
    }
    else{
      clientError(res, 'No such record found')
    }
  }
  catch(e){
    serverError(res, e)
  }
}

async function deleteTodo(req, res){
  try{
    var id = req.query.id || ''

    if(typeof id != 'string' || !id.length || !isValidObjectIdStr(id)){
      return clientError(res, 'Please specify a valid todo id in query string')
    }

    var delAck = await todoDb.findOneAndUpdate('todos', {_id: ObjectId(id), uid: req.user.idx, isa: 1}, {isa: 0, delOn: Date.now()})
    
    if(delAck.lastErrorObject.n){
      success(res, {msg: 'todo deleted successfully!'})
    }
    else{
      clientError(res, 'No such record found')
    }
  }
  catch(e){
    serverError(res, e)
  }
}

module.exports = {
  addNewTodo,
  getTodo,
  updateTodo,
  deleteTodo
}
