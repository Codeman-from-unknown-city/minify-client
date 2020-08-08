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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cash = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const minifyCode_1 = __importDefault(require("./minifyCode"));
class Cash extends Map {
    addFile(filePath) {
        const _super = Object.create(null, {
            set: { get: () => super.set }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let fileContent;
            const ext = path_1.extname(filePath).substring(1);
            switch (ext) {
                case 'html':
                case 'css':
                case 'js':
                    fileContent = minifyCode_1.default({ code: yield fs_1.promises.readFile(filePath, 'utf8'), ext });
                    break;
                default:
                    fileContent = yield fs_1.promises.readFile(filePath);
            }
            _super.set.call(this, filePath, fileContent);
        });
    }
    addDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.promises.readdir(directoryPath, { encoding: null, withFileTypes: true });
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
