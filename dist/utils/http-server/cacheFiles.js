"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashAPI = void 0;
const cashPath_1 = require("../../cashPath");
const fsPromises = require('fs').promises;
const v8 = require('v8');
const path = require('path');
const cashAPI = {
    writeCash(cash) {
        const cashBuffer = v8.serialize(cash ? cash : new Map());
        return fsPromises.writeFile(cashPath_1.cashPath, cashBuffer, { encoding: null });
    },
    getCash() {
        return __awaiter(this, void 0, void 0, function* () {
            const cashBuffer = yield fsPromises.readFile(cashPath_1.cashPath);
            return v8.deserialize(cashBuffer);
        });
    },
    addDir(dirPath) {
        fsPromises.readdir(dirPath, { encoding: null, withFileTypes: true }, (err, files) => {
            if (err)
                throw err;
            for (let file of files) {
                const filePath = path.join(dirPath, file.name);
                if (file.isDirectory())
                    this.addDir(filePath);
                else
                    this.addFile(filePath);
            }
        });
    },
    addFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const cash = this.getCash();
            const ext = path.extname(filePath).substring(1);
            let fileContent;
            switch (ext) {
                case 'js':
                case 'html':
                case 'css':
                    fileContent = yield fsPromises.readFile(filePath, 'utf8');
                    break;
                default:
                    fileContent = yield fsPromises.readFile(filePath, { encoding: null });
            }
            cash.set(filePath, fileContent);
            this.writeCash(cash);
        });
    },
};
exports.cashAPI = cashAPI;
