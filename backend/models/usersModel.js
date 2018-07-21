import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  administrator: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => validator.isEmail(email),
      type: 'invalidEmail',
      message: 'Invalid e-mail format',
    },
  },
  password: { type: String, required: true },
  locator: { type: String },
  title: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String },
  dateOfBirth: { type: Date },
  createdAt: { type: Date, default: Date.now },
  location: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    timezone: {
      offset: { type: String },
    },
  },
  picture: { type: String },
  phones: [{
    type: { type: String },
    number: { type: String },
  }],
});

UserSchema.plugin(uniqueValidator);

export default !mongoose.modelSchemas.users ?
  mongoose.model('users', UserSchema) :
  mongoose;
