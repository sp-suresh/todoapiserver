const {mongoDbClient, ObjectId} = require("nodemongoclient");
const todoDb = new mongoDbClient();

function connectDatabase(connection, onSuccess, onFailure) {
  logger.info(`Connecting to database on ${connection.dbName}`);
  try {
    todoDb.connect(connection, onSuccess, onFailure);
    
  }
  catch(ex) {
    logger.error("Error caught,", ex);
    onFailure(ex);
  }
}

function isValidObjectIdStr(id){
  return id.match(/^[0-9a-fA-F]{24}$/)
}

module.exports = {
  connectDatabase,
  todoDb,
  ObjectId,
  isValidObjectIdStr
};
