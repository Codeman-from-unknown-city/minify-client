interface IConfig {
    host: string
    port: string
    noServer: boolean
}

export const serverConfig: IConfig = {
    host: '0.0.0.0',
    port: process.env.PORT || '8000',
    noServer: true,
}; 