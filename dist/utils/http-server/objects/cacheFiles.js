"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cash = void 0;
const fs = require('fs');
const path = require('path');
class Cash extends Map {
    addFile(filePath) {
        const ext = path.extname(filePath).substring(1);
        const callback = (err, fileContent) => {
            if (err)
                throw err;
            super.set(filePath, fileContent);
        };
        switch (ext) {
            case 'html':
            case 'css':
            case 'js':
                fs.readFile(filePath, 'utf8', callback);
                break;
            default:
                fs.readFile(filePath, callback);
        }
    }
    addDirectory(directoryPath) {
        fs.readdir(directoryPath, { encoding: null, withFileTypes: true }, (err, files) => {
            if (err)
                throw err;
            for (let file of files) {
                const filePath = path.join(directoryPath, file.name);
                if (file.isDirectory())
                    this.addDirectory(filePath);
                else
                    this.addFile(filePath);
            }
        });
    }
}
const cash = new Cash();
exports.cash = cash;
