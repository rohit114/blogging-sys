import { IDBTransactionEx } from './db.transaction';

export interface IRepo {
    beginTransaction: () => Promise<IDBTransactionEx>;
}
