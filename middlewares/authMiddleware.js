var {unauthorised, serverError} = require('./basicResHandler')
var {cookie} = require('../keys')

function verifyCookie(req, res, next) {
  try{
    var ckData = req.signedCookies[cookie.name] || ""
    logger.debug('ckData', ckData)
    if (!ckData || !Object.keys(ckData).length){
      return unauthorised(res, 'Cookie absent')
    }

    req.user = ckData;
    next()
  }
  catch(e){
    serverError(res, 'Failed to authenticate user.')
  }  
}

module.exports = {
  verifyCookie
}
