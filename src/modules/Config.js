import fs from 'fs';
import path from 'path';

export default class Config {
    /**
     * Path of the config file.
     * @type {string}
     */
    static __configPath: string = path.join(
        __dirname,
        '..',
        '..',
        'config.json'
    );

    /**
     * Config data.
     * @type {?object}
     */
    static __data: object = null;

    /**
     * Checks if a config key exists.
     * @param {string} key
     * @returns {boolean}
     */
    static exists(key: string): boolean {
        if (Config.__data === null) Config.init();

        return key in Config.__data;
    }

    /**
     * Gets a config parameter.
     * @param {string} key
     * @returns {any}
     */
    static get(key: string): any {
        if (Config.__data === null) Config.init();

        if (!Config.exists(key)) return null;

        return Config.__data[key];
    }

    /**
     * Initializes the config.
     * @returns {void}
     */
    static init(): void {
        const rawData: string = fs
            .readFileSync(Config.__configPath)
            .toString('utf8');

        this.__data = JSON.parse(rawData);
    }
}
