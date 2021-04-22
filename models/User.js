const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  nickname: { type: String, required: true, unique: true, minlength: 3, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  active: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
},
{
  timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
