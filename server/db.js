const db = require('monk')(process.env.MONGODB_URI);

const users = db.get('users')

module.exports = {
  Users: users
}
