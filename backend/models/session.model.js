import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'sessions', required: true },
    administrator: { type: Boolean, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    picture: { type: String },
  },
  remoteAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
});

export default mongoose.model('sessions', SessionSchema);
