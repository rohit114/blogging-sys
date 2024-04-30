import { ILoggingUtil, getLoggingUtil } from "src/utils/logging.util";


export abstract class BaseManager {
    protected readonly logger: ILoggingUtil;

    constructor(loggerName: string) {
        this.logger = getLoggingUtil(loggerName);
    }
}
