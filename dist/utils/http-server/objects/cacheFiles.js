"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cash = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Cash extends Map {
    addFile(filePath) {
        const ext = path_1.extname(filePath).substring(1);
        const callback = (err, fileContent) => {
            if (err)
                throw err;
            super.set(filePath, fileContent);
        };
        switch (ext) {
            case 'html':
            case 'css':
            case 'js':
                fs_1.readFile(filePath, 'utf8', callback);
                break;
            default:
                fs_1.readFile(filePath, callback);
        }
    }
    addDirectory(directoryPath) {
        fs_1.readdir(directoryPath, { encoding: null, withFileTypes: true }, (err, files) => {
            if (err)
                throw err;
            for (let file of files) {
                const filePath = path_1.join(directoryPath, file.name);
                if (file.isDirectory())
                    this.addDirectory(filePath);
                else
                    this.addFile(filePath);
            }
        });
    }
}
exports.cash = new Cash();
