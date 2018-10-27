var {serverError, clientError, success} = require('../../middlewares/basicResHandler')
var {todoDb, ObjectId, isValidObjectIdStr} = require('../../lib/mongoDbClient')
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
      attUrl: null
    }
    if(req.file){
      todoDoc.attUrl = `attachments/${req.file.filename}`
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

    var todoList = await todoDb.findDocFieldsByFilter('todos', {uid}, {uid: 0}, lmt, off)

    success(res, {ttc, todoList})
  }
  catch(e){
    serverError(res, e)
  }
}

async function updateTodo(req, res){
  try{
    var body = req.body

    logger.debug('body', body)

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
      attUrl: null
    }
    if(req.file){
      todoDoc.attUrl = "attachments/"+req.file.filename
    }
    else{
      //Delete old file
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
    logger.debug('delAck', delAck)
    if(delAck.lastErrorObject.n){
      success(res, {msg: 'todo deleted successfully!'})
    }
    else{
      clientError(res, 'No such record found')
    }
  }
  catch(e){
    // if(e.message === )
    serverError(res, e)
  }
}

module.exports = {
  addNewTodo,
  getTodo,
  updateTodo,
  deleteTodo
}
