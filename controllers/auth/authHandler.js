var {serverError, clientError, success, notFound, unauthorised} = require('../../middlewares/basicResHandler')
var {todoDb} = require('../../lib/mongoDbClient')
var keys = require('../../keys')
var cookieConf = keys.cookie
var bcrypt = require('bcrypt');

async function login(req, res){
  try{
    var body = req.body || {}
    if(!Object.keys(body).length){
      return clientError(res, 'Please provide a valid req body!')
    }

    var eml = body.eml || ''
    var pwd = body.pwd || ''

    if(typeof eml != 'string' || !eml.length || typeof pwd != 'string' || !pwd.length){
      return clientError(res, 'Please specify a valid eml and pwd');
    }
    
    var usrObj = await todoDb.findDocFieldsByFilter('users', {eml}, {_id: 0, hashSalt: 0}, 1)
    if(!usrObj || !usrObj.length){
      return notFound(res, 'No such user found!')
    }
    usrObj = usrObj[0]
    var isValidPwd = await bcrypt.compare(pwd, usrObj.pwdHash)

    if(!isValidPwd){
      return unauthorised(res, 'Invalid password!')
    }

    delete usrObj['hashSalt']
    delete usrObj['pwdHash']

    res.cookie(cookieConf.name, usrObj, { maxAge: cookieConf.maxAge, httpOnly: cookieConf.httpOnly, signed: true });
    success(res, usrObj);
  }
  catch(e){
    serverError(res, e)
  }
}

async function logout(req, res){
  res.clearCookie(cookieConf.name, { maxAge: cookieConf.maxAge, httpOnly: cookieConf.httpOnly, signed: true })
  success(res)
}

module.exports = {
  login,
  logout
}
