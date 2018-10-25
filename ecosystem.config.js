var env = require('./env')

module.exports = {
  apps : [{
    name      : 'Todo API Server',
    script    : 'index.js',
    env: Object.assign({
      NODE_ENV: 'development'
    }, env.development),
    env_production : Object.assign({
      NODE_ENV: 'production'
    }, env.production)
  }]
}
