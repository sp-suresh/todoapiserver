global.logger = require('nodewinstonlogger')

logger.info(`Starting Todo API Server!`)

var {mongo, PORT} = require('./keys')
var {todoDb} = require('./lib/mongoDbClient')
var {notFound} = require('./middlewares/basicResHandler')
var express = require("express")
var router = express.Router()
var app = express()
var bodyParser = require('body-parser')

todoDb.connect(mongo, () => {
  logger.info(`Connected to mongodb database: ${mongo.dbName}!`)
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json())
  app.use(require('cookie-parser')());

  router.use('/todo', require('./controllers/todo'))
  router.use('/auth', require('./controllers/auth'))
  
  app.use('/api', router)
  app.use(function(req, res, next){
    notFound(res)
  });
  app.listen(PORT, (e) => {
    if(e){
      logger.error('Error starting application', e)
      process.exit()
    }
    else{
      logger.info(`Application started on port: ${PORT}`)
    }
  })
}, (err) => {
  logger.error(err)
  process.exit()
})
