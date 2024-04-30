import { TableName } from '../common/constants';
import { IUserRepo } from '../interfaces/user.repo';
import { MySqlBaseRepo, MySqlColumnValue } from './base/base.mysql.repo';
import { IUser, UserImpl } from '@core/backend-model';
import { UserFormat } from '@core/backend-model/src/impls/formats';

export class UserMysqlRepo extends MySqlBaseRepo implements IUserRepo {
    async saveAccessToken(userId:string, accessToken: string): Promise<any> {
        let query: string[] = [];
        let colVals: string[] = [];
        query.push(`UPDATE ${TableName.USERS}`)
        query.push(`SET access_token = ?`)
        query.push(`WHERE user_id = ?;`);
        colVals.push(accessToken);
        const ack = await this.updateByQueyAndValue(query.join(' '), colVals, [userId]);
        return ack;
    }
    async findByEmailOrMobile(email?: string, mobile?: string): Promise<IUser | null> {
        let query: string[] = [];
        let whereValues: string[] = [];
        query.push('SELECT * ');
        query.push(`FROM ${TableName.USERS}`);
        if (email) {
            query.push('WHERE email=?;');
            whereValues.push(email)
        } else if (mobile) {
            query.push('WHERE mobile=?;');
            whereValues.push(mobile)
        } else {
            throw Error(`Bad Request Invalid email or mobile`)
        }
        let data = await this.selectByQueryAndValues(query.join(' '), whereValues);
        if (data == null || data.length == 0) return null;
        return UserImpl.buildFromRow(data[0] as UserFormat)
    }

    async readById(id: number): Promise<IUser | null> {
        let query: string[] = [];
        query.push('SELECT * ');
        query.push(`FROM ${TableName.USERS}`);
        query.push('WHERE id=?;');

        let data = await this.selectByQueryAndValues(query.join(' '), [id]);
        if (data == null || data.length == 0) return null;
        return UserImpl.buildFromRow(data[0] as UserFormat)
    }

    async readByUserId(userId: string): Promise<any | null> {
        let query: string[] = [];
        query.push('SELECT * ');
        query.push(`FROM ${TableName.USERS}`);
        query.push('WHERE user_id=?;');

        let data = await this.selectByQueryAndValues(query.join(' '), [userId]);
        if (data == null || data.length == 0) return null;
        return UserImpl.buildFromRow(data[0] as UserFormat)
    }

    async createOne(user: IUser): Promise<number> {
        let colVals: MySqlColumnValue[] = this.buildMySqlColValForUser(user);
        let insertId = await this.insertOne(TableName.USERS, colVals);
        return insertId;
    }

    private buildMySqlColValForUser(user: IUser) {
        let colVals: MySqlColumnValue[] = [];
        let row: UserFormat = UserImpl.buildRow(user);

        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                const value = row[key as keyof UserFormat];
                colVals.push(new MySqlColumnValue(key, value));
            }
        }
        return colVals;
    }

    markInActive(userId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    markBlocked(userId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    markActive(userId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    markUnblocked(userId: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
