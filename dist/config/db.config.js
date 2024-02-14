"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('db', () => {
    return {
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        USERNAME: process.env.USERNAME,
        AUTO_LOAD_ENTITIES: process.env.AUTO_LOAD_ENTITIES,
        PASSWORD: process.env.PASSWORD,
        DATABASE: process.env.DATABASE,
        SYNC: process.env.NODE_ENV === 'dev'
            ? process.env.SYNC_DEV
            : process.env.SYNC_PROD,
    };
});
//# sourceMappingURL=db.config.js.map