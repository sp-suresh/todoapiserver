const multer = require('multer')
const path   = require('path')

const crypto = require("crypto")

const id = crypto.randomBytes(16).toString("hex")

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/attachments',
  filename: function(req, file, fn){
    fn(null, `${crypto.randomBytes(16).toString("hex")}-${req.user.idx}-${path.extname(file.originalname)}`)
  }
}) 

const upload =  multer({
  storage: storageEngine,
  limits: { fileSize: 5*5*1024*1024 },
  fileFilter: function(req, file, callback){
    logger.debug('before validate', file)
    validateFile(file, callback)
  }
}).single('file')

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif|js|javascript|pdf|html/
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType  = allowedFileTypes.test(file.mimetype)
  if(extension && mimeType){
    return cb(null, true)
  }else{
    cb("Invalid file type. Only jpeg|jpg|png|gif|javascript|pdf|html file are allowed.")
  }
}

module.exports = upload
