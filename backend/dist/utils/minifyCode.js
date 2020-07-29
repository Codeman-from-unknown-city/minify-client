"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UGLIFY = require('uglify-es');
const minifyCss = (code) => code
    .replace(/(\W)\s+(.)/g, '$1$2')
    .replace(/(\w)\s+(\W)/g, '$1$2');
function minifyJs(code) {
    const result = UGLIFY.minify(code).code;
    return result ? result : 'Sorry, this minifier does not support your code';
}
function minifyHtml(code) {
    code = code
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><');
    const cssTemplate = /<(style)>(.+)<\/style>/g;
    const jsTemplate = /<(script)>(.+)<\/script>/g;
    if (code.match(cssTemplate))
        code = code.replace(cssTemplate, replaceInnerHtml);
    if (code.match(jsTemplate))
        code = code.replace(jsTemplate, replaceInnerHtml);
    return code;
}
function replaceInnerHtml(match, tag, code) {
    let result = tag === 'style' ? minifyCss(code) : minifyJs(code);
    return `<${tag}>${result}</${tag}>`;
}
function minify(code, ext) {
    let result;
    switch (ext) {
        case 'html':
            result = minifyHtml(code);
            break;
        case 'css':
            result = minifyCss(code);
            break;
        case 'js':
            result = minifyJs(code);
            break;
        default:
            return code;
    }
    return result.trim();
}
exports.default = minify;
