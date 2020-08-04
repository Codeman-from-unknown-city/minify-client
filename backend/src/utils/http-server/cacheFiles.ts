/// <reference path="./../interfaces.ts" />

import { cashPath } from "../../cashPath"

const fsPromises = require('fs').promises;
const v8 = require('v8');
const path = require('path');


const cashAPI: I.Cash = {
    writeCash(cash: any) {
        const cashBuffer: Buffer = v8.serialize(cash ? cash : new Map());

        return fsPromises.writeFile(cashPath, cashBuffer, {encoding: null});
    },

    async getCash() {
        const cashBuffer: Buffer = await fsPromises.readFile(cashPath);

        return v8.deserialize(cashBuffer);
    },
    
    addDir(dirPath: string) {
        fsPromises.readdir(dirPath,
        {encoding: null, withFileTypes: true}, 
        (err: Error, files: any) => {
            if (err) throw err;

            for (let file of files) {
                const filePath: string = path.join(dirPath, file.name);
                if (file.isDirectory()) this.addDir(filePath);
                else this.addFile(filePath);
            }
        });
    },
    
    async addFile(filePath: string) {
        const cash: any = this.getCash();
        const ext: string = path.extname(filePath).substring(1);
        let fileContent: string;

        switch (ext) {
            case 'js':
            case 'html':
            case 'css':
                fileContent = await fsPromises.readFile(filePath, 'utf8');
                break;

            default:
                fileContent = await fsPromises.readFile(filePath, {encoding: null});
        }

        cash.set(filePath, fileContent);
        this.writeCash(cash);
    },
};

export {cashAPI};
