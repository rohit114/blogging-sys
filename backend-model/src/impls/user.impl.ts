import { IUser } from '../interface/user';
import { UserFormat } from './formats';

export class UserImpl implements IUser {
    userId: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    isActive: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: {
        userId: string;
        firstName: string;
        lastName: string;
        mobile: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.mobile = user.mobile;
        this.email = user.email;
        this.isActive = true;
        this.isBlocked = false;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt
    }
    
    
    static buildRow(user: IUser): UserFormat {
        return {
            user_id: user.userId,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            mobile: user.mobile,
            is_active: user.isActive,
            is_blocked: user.isBlocked,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        };
    }

    static buildFromRow(user: UserFormat):IUser  {
        return {
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            mobile: user.mobile,
            isActive: user.is_active,
            isBlocked: user.is_blocked,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        };
    }
}
