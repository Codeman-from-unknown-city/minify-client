/// <reference path="./interfaces.ts" />

import { minify as uglifyMinify } from "uglify-es";

const minifyCss = (code: string): string => code
    .replace(/}\s+(.)/g, '}$1')
    .replace(/{\s+(.)/g, '{$1')
    .replace(/(\W)\s+(.)/g, '$1$2')
    .replace(/(\w)\s+([{>])/g, '$1$2')
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

const minifyJs = (code: string, result: string | undefined = uglifyMinify(code).code): string => result ? result : code;

function minifyHtml(code: string): string {
    code = code
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><');

    const cssTemplate: RegExp = /<(style)>(.+)<\/style>/g;
    const jsTemplate: RegExp = /<(script)>(.+)<\/script>/g;

    if (code.match(cssTemplate)) code = code.replace(cssTemplate, replaceInnerHtml);
    if (code.match(jsTemplate)) code = code.replace(jsTemplate, replaceInnerHtml);

    return code.replace(/<!--(?:(?!-->).)*-->/g, '');
}

function replaceInnerHtml(match: string, tag: string, code: string): string {
    let result: string = tag === 'style' ? minifyCss(code) : minifyJs(code);

    return `<${tag}>${result}</${tag}>`
}

export default function minify(code: string, ext: string): string { 
    let result: string;

    switch(ext) {
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
