const mongoMod = require("nodemongoclient");
const todoDb = new mongoMod();

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

module.exports = {
  connectDatabase,
  todoDb,
};