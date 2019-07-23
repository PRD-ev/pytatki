
const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { User } = require('./User')
const { Note } = require('./Note')
const { Folder } = require('./Folder')
const { Group } = require('./Group')

const resolvers = {
  Query,
  Mutation,
  User,
  Note,
  Folder,
  Group,
}

module.exports = {
  resolvers,
}