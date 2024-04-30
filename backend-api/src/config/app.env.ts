require('dotenv').config();

export enum AppEnvironment {
    DEV = 'DEV',
    UAT = 'UAT',
    PROD = 'PROD'
}

export const AppEnv = {
    ENV: process.env.ENV!,
    MYSQL: {
        HOST: process.env.MYSQL_HOST!,
        PORT: process.env.MYSQL_PORT!,
        USERNAME: process.env.MYSQL_USERNAME!,
        PASSWORD: process.env.MYSQL_PASSWORD!,
        DATABASE: process.env.MYSQL_DATABASE!
    }
};

export const validateENVVars = () => {
    let requiredENVs = [
        'ENV',
        'MYSQL_HOST',
        'MYSQL_PORT',
        'MYSQL_USERNAME',
        'MYSQL_PASSWORD',
        'MYSQL_DATABASE'
    ];
    requiredENVs.forEach((it) => {
        if (
            process.env[it] == null ||
            process.env[it] == undefined ||
            process.env[it]?.trim().length == 0
        ) {
            throw new Error(
                `Environment variable ${it} is required and can not be empty`
            );
        }
    });

    let allowedENVs = [
        AppEnvironment.DEV,
        AppEnvironment.UAT,
        AppEnvironment.PROD
    ].map((it) => it.toString());

    if (!allowedENVs.includes(AppEnv.ENV)) {
        throw new Error(
            `Invalid value ${
                AppEnv.ENV
            } for ENV. It should be [${allowedENVs.join(',')}]`
        );
    }
};
