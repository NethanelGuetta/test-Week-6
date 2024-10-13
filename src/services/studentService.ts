import Student, { IStudent } from "../models/studentModel";
import { IGrade } from "../models/studentModel";
import { Types } from 'mongoose';

export const createStudent = async (data: Partial<IStudent> ): Promise<IStudent> => {
    const studend = new Student(data);
    return (await studend.save());
}

export const updateStudent = async (id: Types.ObjectId, classId: Types.ObjectId): Promise<IStudent | null> => {
    const student = await Student.findByIdAndUpdate(id, { classId }, { new: true });
    return student;
}

export const addScore = async (id: string, data: Partial<IGrade>): Promise<IStudent | null> => {
    const student = await Student.findByIdAndUpdate(id, { $push: { grades: data } },{ new: true });
    return student;
}
export const getStudents = async (): Promise<IStudent[] | null> => {
    const students = await Student.find();
    return students;
}
export const getStudentByClass = async (classIdid: Types.ObjectId): Promise<IStudent[] | null> => {
    const students = await Student.find({ classId: classIdid });
    console.log(students);
    return students;
}

export const getScoresOfStudent = async (id: string): Promise<IGrade[] | null> => {
    const student = await Student.findById(id);
    console.log(student);
    if (!student) {
        return null
    }
    return  student.grades
}
