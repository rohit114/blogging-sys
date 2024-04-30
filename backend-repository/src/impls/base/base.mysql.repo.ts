//import { InfraActionException } from 'todo';
import { Connection, Pool, ResultSetHeader } from 'mysql2/promise';
import {
    IDBTransactionEx,
    MySqlTransactionEx
} from '../../base/db.transaction';

export class MySqlColumnValue {
    column: string;
    value: Object | null;

    constructor(column: string, value: Object | null) {
        this.column = column;
        this.value = value;
    }
}

export class MySqlBaseRepo {
    private readonly INFRA_NAME: 'MySQL' = 'MySQL';
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async beginTransaction(): Promise<IDBTransactionEx> {
        try {
            let connection = await this.pool.getConnection();
            let dbTransaction: IDBTransactionEx = new MySqlTransactionEx(
                connection
            );
            await connection.beginTransaction();
            return dbTransaction;
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`);
        }
    }

    async insertOne(
        table: string,
        insertColVals: MySqlColumnValue[],
        dbTransaction: MySqlTransactionEx | null = null
    ): Promise<number> {
        try {
            let query = this.buildInsertOneQuery(table, insertColVals);
            console.log("------> query", query)
            console.log("------> insertColVals", insertColVals)
            let values = insertColVals.map((it) => it.value);
            console.log("------> insert values", values)
            let poolOrCon = dbTransaction?.connection || this.pool;
            let [result] = await this.executeQuery(poolOrCon, query, values);
            let insertResult: ResultSetHeader = result as ResultSetHeader;

            return insertResult.insertId;
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`);
        }
    }

    async insertMany(
        table: string,
        insertColVals: MySqlColumnValue[][],
        dbTransaction: MySqlTransactionEx | null = null
    ): Promise<boolean> {
        // use to insert many of the same table, same column and values length
        try {
            let query = this.buildInsertManyQuery(table, insertColVals[0]);
            let values = insertColVals.map((it) => it.map((it) => it.value));
            let poolOrCon = dbTransaction?.connection || this.pool;
            let result = await this.executeQuery(poolOrCon, query, [values]);
            return result != null;
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`);
        }
    }

    async updateByQueyAndValue(
        query: string,
        updateValues: string[],
        whereValues: string[],
        dbTransaction: MySqlTransactionEx | null = null
    ): Promise<any> {
        try {
            let poolOrCon = dbTransaction?.connection || this.pool;
            console.log("-----> updateValues.concat(whereValues)", updateValues.concat(whereValues))
            let values = updateValues.concat(whereValues);
            const ack = await this.executeQuery(
                poolOrCon,
                query,
                values
            );
            return ack;
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`);
        }
    }

    async deleteByWhereClause(
        query: string,
        whereValues: Object[],
        dbTransaction: MySqlTransactionEx | null = null
    ): Promise<void> {
        try {
            let poolOrCon = dbTransaction?.connection || this.pool;
            const ack = await this.executeQuery(
                poolOrCon,
                query,
                whereValues
            );
            return ack;
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`);
        }
    }

    async selectByQueryAndValues(
        query: string,
        whereValues: Object[]
    ): Promise<Object[] | null> {
        try {
            let [result] = await this.pool.query(query, whereValues);
            if (result == null) return null;
            return result as object[];
        } catch (error) {
            throw Error(`InfraActionException ${error.message}`)
        }
    }

    private async executeQuery(
        poolOrCon: Pool | Connection,
        query: string,
        values: any
    ) {
        return poolOrCon.query(query, values);
    }

    private buildInsertOneQuery(
        table: string,
        insertColVals: MySqlColumnValue[]
    ) {
        let colStr = insertColVals.map((it) => it.column).join(',');
        let valStr = insertColVals.map(() => '?').join(',');
        let query = `INSERT INTO ${table} (${colStr}) VALUES(${valStr});`;
        return query;
    }

    private buildInsertManyQuery(
        table: string,
        insertColVals: MySqlColumnValue[]
    ) {
        let colStr = insertColVals.map((it) => it.column).join(',');
        let query = `INSERT INTO ${table} (${colStr}) VALUES ?;`;
        return query;
    }
}
