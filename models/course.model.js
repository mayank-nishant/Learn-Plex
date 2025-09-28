import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "admin" },
    students: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

const courseModel = mongoose.model("course", courseSchema);

export default courseModel;
