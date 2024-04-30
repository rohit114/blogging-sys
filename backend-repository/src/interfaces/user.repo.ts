import { IUser } from '@core/backend-model';

export interface IUserRepo {
    readById(id: number): Promise<IUser | null>;
    readByUserId(userId: string): Promise<IUser | null>;
    createOne(user: IUser): Promise<number>;
    markInActive(userId: string):Promise<any>;
    markBlocked(userId: string):Promise<any>;
    markActive(userId: string):Promise<any>;
    markUnblocked(userId: string):Promise<any>;
}
