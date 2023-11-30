const { Schema, model } = require('mongoose') // Erase if already required

const COLLECTION_NAME = 'Key'
const DOCUMENT_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    publicKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: Array,
      required: true,
      default: []
    }
  },
  {
    timestamps: true,
    colection: COLLECTION_NAME
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema)
