import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  creatorId: { type: Schema.Types.ObjectId, ref: 'admin', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const courseModel = mongoose.model('course', courseSchema);

export default courseModel;
