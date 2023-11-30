const { Schema, model } = require('mongoose') // Erase if already required

const COLLECTION_NAME = 'User'
const DOCUMENT_NAME = 'Users'
// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive'
    },
    verify: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    colection: COLLECTION_NAME
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema)
