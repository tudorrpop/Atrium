import { Course } from "./course";
import { User } from "./user";

export class Professor extends User{

    courses: Course[] | undefined; 
}