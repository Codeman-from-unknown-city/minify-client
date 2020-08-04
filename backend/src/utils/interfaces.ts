namespace I {
    export interface Data {
        ext: string,
        code: string,
        name: string
    }

    export interface Config {
        host: string
        port: string
        noServer: boolean
    }

    export interface Cash {
        writeCash(cash?: any): Promise<any>
        getCash(): any
        addDir(dirPath: string): void
        addFile(filePath: string): void
    }
}
