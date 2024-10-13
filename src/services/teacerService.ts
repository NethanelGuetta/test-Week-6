import Teacher, { ITeacher } from "../models/teacherModel";
import { Types } from 'mongoose';

export const createTeacher = async (data: Partial<ITeacher> ): Promise<ITeacher> => {
    const teacher = new Teacher(data);
    return (await teacher.save());
}

export const updateTeacher = async (id: Types.ObjectId, classId: Types.ObjectId): Promise<ITeacher | null> => {
    const teacher = await Teacher.findByIdAndUpdate(id, { classId }, { new: true });
    return teacher;
}