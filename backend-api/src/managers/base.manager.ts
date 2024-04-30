import { ILoggingUtil, getLoggingUtil } from "../utils";



export abstract class BaseManager {
    protected readonly logger: ILoggingUtil;

    constructor(loggerName: string) {
        this.logger = getLoggingUtil(loggerName);
    }
}
