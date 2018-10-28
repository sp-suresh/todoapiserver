module.exports = {
  mongo: JSON.parse(process.env.mongo),
  PORT: process.env.PORT,
  cookie: JSON.parse(process.env.cookie),
  attFileLoc: process.env.attFileLoc,
  attRoute: process.env.attRoute,
  serverHost: process.env.serverHost
}
