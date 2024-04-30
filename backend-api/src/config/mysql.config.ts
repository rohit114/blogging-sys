import { createPool } from 'mysql2/promise';
import { AppEnv } from './app.env';
import { Pool } from 'mysql2/promise';
import { getLoggingUtil } from '../utils/logging.util';


const logger = getLoggingUtil('MYSQL');

const mysqlConfig = {
    host: AppEnv.MYSQL.HOST,
    port: Number(AppEnv.MYSQL.PORT),
    user: AppEnv.MYSQL.USERNAME,
    //password: AppEnv.MYSQL.PASSWORD,
    database: AppEnv.MYSQL.DATABASE,
    waitForConnections: true,
    connectionLimit: 15
};

let mysqlPool: Pool = createPool(mysqlConfig);
export async function initMySQL() {
    logger.info('MYSQL::INIT', 'INITIALIZING MySQL');
    let con = await mysqlPool.getConnection();
    try {
        con.ping();
    } catch (error) {
        logger.error('MYSQL::FAILED', error ?? 'mysql-init-error');
    } finally {
        con.release();
    }
    logger.info('MYSQL::STARTED', 'INITIALIZED MySQL');
}

export { mysqlPool };
