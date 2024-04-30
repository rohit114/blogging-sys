import { PoolConnection } from 'mysql2/promise';

/**
 * ..Ex stands for extended
 */
export interface IDBTransactionEx {
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    release: () => Promise<void>;
}

export class MySqlTransactionEx implements IDBTransactionEx {
    readonly connection: PoolConnection;

    constructor(connection: PoolConnection) {
        this.connection = connection;
    }

    async commit(): Promise<void> {
        await this.connection.commit();
    }

    async rollback(): Promise<void> {
        await this.connection.rollback();
    }

    async release(): Promise<void> {
        this.connection.release();
    }
}
