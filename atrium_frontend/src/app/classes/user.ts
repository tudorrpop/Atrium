export class User {
    id: number | undefined;
    
    email!: string;
    name!: string;
    username!: string;
    joinDate!: Date;
    role!: string;
}