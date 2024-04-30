const moment = require('moment-timezone');
const logDateFormat = 'YYYY-MM-DD HH:mm:ss';

export interface ILoggingUtil {
    readonly name: string;
    /**
     * action: name of the action/process which logs
     */

    info: (action: string, info: Object) => void;
    data: (action: string, info: Object) => void;
    warn: (action: string, warning: Object) => void;
    error: (action: string, error: Object) => void;
}

enum LogType {
    INFO = 'INFO',
    DATA = 'DATA',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
}

class ConsoleLoggingUtil implements ILoggingUtil {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    info(action: string, info: Object) {
        console.info(
            moment().format(logDateFormat),
            `[${LogType.INFO}] -`,
            `[${this.name}]`,
            action,
            JSON.stringify(info)
        );
    }

    data(action: string, data: Object) {
        console.log(
            moment().format(logDateFormat),
            `[${LogType.DATA}] -`,
            `[${this.name}]`,
            action,
            JSON.stringify(data)
        );
    }

    warn(action: string, warning: Object) {
        console.warn(
            moment().format(logDateFormat),
            `[${LogType.WARNING}] -`,
            `[${this.name}]`,
            action,
            JSON.stringify(warning)
        );
    }

    error(action: string, error: Object) {
        console.error(
            moment().format(logDateFormat),
            `[${LogType.ERROR}] -`,
            `[${this.name}]`,
            action,
            JSON.stringify(error)
        );
    }
}

export const getLoggingUtil = (name: string): ILoggingUtil => {
    return new ConsoleLoggingUtil(name);
};
