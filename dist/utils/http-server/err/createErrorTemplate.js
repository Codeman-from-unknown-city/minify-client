"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minifyCode_1 = __importDefault(require("../../minifyCode"));
const head_1 = __importDefault(require("./head"));
const style_1 = __importDefault(require("./style"));
exports.default = (errMessage) => minifyCode_1.default(`
<!DOCTYPE html>
<html lang="en">
${head_1.default}
<body>
    <style>${style_1.default}</style>
    <div class="err">
        <a class="return" href="/"><h2>← Return to the homepage</h2></a>
        <h1>HTTP/1.1 ${errMessage}</h1>
    </div>
</body>
</html>
`, 'html');
