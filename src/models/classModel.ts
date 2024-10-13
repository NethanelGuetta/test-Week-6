import mongoose, { Schema, Document, Types } from "mongoose";
import { IStudent } from "./studentModel";
export interface IClass extends Document {
    name: string;
    teacheId: Types.ObjectId;
    students: IStudent[];
}

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacherId: {
        type: String,
        required: true,
        ref: "Teacher",
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId
        },
    ],
});