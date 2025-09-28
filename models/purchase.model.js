import mongoose from "mongoose";

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },     
    courseId: { type: Schema.Types.ObjectId, ref: "course" },
    purchaseDate: { type: Date, default: Date.now }
});

const purchaseModel = mongoose.model("purchase", purchaseSchema);

export default purchaseModel;