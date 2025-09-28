import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    createdCourses: [{ type: Schema.Types.ObjectId, ref: "course" }]
});

const adminModel = mongoose.model("admin", adminSchema);

export default adminModel;