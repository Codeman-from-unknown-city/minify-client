/// <reference path="../interfaces.ts" />

export const serverConfig: I.Config = {
    host: '0.0.0.0',
    port: process.env.PORT || '8000',
    noServer: true,
}; 
