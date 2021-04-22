const { Schema, model, Types } = require('mongoose');

const cardSchema = new Schema({
  owner: { type: Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: 1 },
  message: { type: String, required: false },
  image: { type: String, required: true },
  email: { type: String, required: false },
  twitter: { type: String, required: false },
  mobile: { type: String, required: false },
  website: { type: String, required: false },
  facebook: { type: String, required: false },
  instagram: { type: String, required: false },
  other : { type: String, required: false },
  link: { type: String, required: true, unique: true }
},
{
  timestamps: true,
});

const Card = model('Card', cardSchema);

module.exports = Card;
