var jwt = require('jsonwebtoken')
var {unauthorised} = require('./basicResHandler')
var keys = require('../keys')
var cookieConf = keys.cookie
async function verifyCookie(req, res, next) {
  try{
    var token = req.signedCookies[cookieConf.name] || ""
    if (!token.length){
      return unauthorised(res, 'Token absent')
    }

    var decoded = await jwt.verify(token, jwtConf.secret)
    if(decoded){
      req.tkn = decoded.id
      next()
    }
  }
  catch(e){
    unauthorised(res, 'Failed to authenticate token.')
  }  
}

module.exports = {
  verifyCookie
}
