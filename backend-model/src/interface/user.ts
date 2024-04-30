export interface IUser {
    userId:string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    isActive:boolean;
    isBlocked:boolean;
    accessToken:string;
    createdAt:Date;
    updatedAt:Date;
}
