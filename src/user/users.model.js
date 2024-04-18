const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter Password'],
  },
  accountNumber: {
    type: String,
    required: [true, 'Please enter account number'],
    unique: true,
  },
  emailAddress: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
  },
  identityNumber: {
    type: String,
    required: [true, 'Please enter identity number'],
    unique: true,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;