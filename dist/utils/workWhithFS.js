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
exports.deleteUserDir = exports.saveFile = void 0;
const fs_1 = require("fs");
const minifyCode_1 = __importDefault(require("./minifyCode"));
const path_1 = require("path");
const saveFile = (userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ext, code } = file;
    const pathToUserDir = getPathToUserDir(userId);
    const filePath = path_1.join(pathToUserDir, name);
    try {
        yield fs_1.promises.mkdir(pathToUserDir);
    }
    catch (e) { }
    finally {
        yield fs_1.promises.writeFile(filePath, minifyCode_1.default(code, ext));
    }
});
exports.saveFile = saveFile;
const getPathToUserDir = (userId) => path_1.join(process.cwd(), 'users_files', userId);
const deleteUserDir = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield fs_1.promises.rmdir(getPathToUserDir(userId), { recursive: true }); });
exports.deleteUserDir = deleteUserDir;
