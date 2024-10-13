import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

export interface IStudent {
    name: string;
    email: string;
    password: string;
    classId: Types.ObjectId;
    teacherId: Types.ObjectId;
    grades: { "exam": string, "score": number }[];
    comparePassword(userPassword: string): Promise<boolean>;
}

const StudentSchema = new Schema({
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
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
}, {
    timestamps: true
}
);

// encrypt password before saving to db
StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare user password with db password
StudentSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
}

StudentSchema.index({ name: 1 });
StudentSchema.index({ teacherId: 1 });
StudentSchema.index({ classId: 1 });

export default mongoose.model<IStudent>("User", StudentSchema)
