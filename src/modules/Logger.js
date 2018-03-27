import Config from './Config';
import moment from 'moment';
import path from 'path';
import winston from 'winston';

const logPath: string = path.join(
    __dirname,
    '..',
    '..',
    Config.get('logPath'),
    moment().format('DD.MM.YYYY')
);

const logger = winston.createLogger({
    format: winston.format.json(),
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.printf(
                    info =>
                        `[${moment().format('DD.MM.YYYY HH:mm:ss')}] [app] ${
                            info.level
                        }: ${info.message}`
                )
            )
        }),
        new winston.transports.File({
            filename: logPath + '.json'
        }),
        new winston.transports.File({
            filename: logPath + '.error.json',
            level: 'error'
        })
    ]
});

export default logger;
