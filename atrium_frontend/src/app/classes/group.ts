import { Student } from "./student";

export class Group {

    groupid?: number | undefined;

    slotid: number | undefined;
    students: Student[] | undefined;
}