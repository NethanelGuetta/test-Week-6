import Class, { IClass } from "../models/classModel";
import { ObjectId, Types } from 'mongoose';

export const createKlass = async (data : Partial<IClass>): Promise<IClass> => {
    const Klass = new Class(data);

    return await Klass.save();
}

export const addStudentToClass = async (className: string,  studentId: Types.ObjectId): Promise<IClass | null> => {
    const klass = await Class.findOneAndUpdate({ name: className }, { $push: { students: studentId } }, { new: true });
    return klass;
}