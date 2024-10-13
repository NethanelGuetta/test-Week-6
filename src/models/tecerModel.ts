import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

export interface ITeacher extends Document {
    name: string;
    email: string;
    password: string;
    classId: Types.ObjectId[];
    comparePassword(userPassword: string): Promise<boolean>;
}

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [20, "Username must be at most 20 characters long"],
        minlength: [3, "Username must be at least 3 characters long"],
        match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [validator.isStrongPassword, "Password is not strong enough"]
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }
}, {
    timestamps: true
});

TeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    next();
});

// compare user password with db password
TeacherSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
}

TeacherSchema.index({ name: 1 });
TeacherSchema.index({ classId: 1 });

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
