const userModel = require('../models/user.model')

async function findByEmail({
  email,
  select = { email: 1, password: 2, name: 1, status: 1, roles: 1 }
}) {
  return await userModel.findOne({ email }).select(select).lean()
}

module.exports = { findByEmail }
