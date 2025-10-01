import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  createdCourses: [{ type: Schema.Types.ObjectId, ref: 'course' }],
});

const adminModel = mongoose.model('admin', adminSchema);

export default adminModel;
