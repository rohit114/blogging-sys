export interface IUser {
    userId:string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    isActive:boolean;
    isBlocked:boolean;
    createdAt:Date;
    updatedAt:Date;
}
