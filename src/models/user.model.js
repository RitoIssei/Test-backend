const mongoose = require('mongoose') // Erase if already required

const COLLECTION_NAME = 'shops'
const DOCUMENT_NAME = 'shops'
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
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
    timestamps: {
      timestamps: true,
      colection: COLLECTION_NAME
    }
  }
)

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema)
