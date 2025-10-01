import mongoose from 'mongoose';

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'course', required: true },
  purchaseDate: { type: Date, default: Date.now },
});

const purchaseModel = mongoose.model('purchase', purchaseSchema);

export default purchaseModel;
