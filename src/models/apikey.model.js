const { Schema, model } = require('mongoose') // Erase if already required

const COLLECTION_NAME = 'Apikey'
const DOCUMENT_NAME = 'Apikeys'
// Declare the Schema of the Mongo model
var apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: Boolean,
      default: true
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222']
    }
  },
  {
    timestamps: true,
    colection: COLLECTION_NAME
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema)
