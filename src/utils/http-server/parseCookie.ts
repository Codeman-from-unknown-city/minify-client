import checkedIncomingMessage from "./checkedIncomingMessage";

interface ICookies {[i: string]: string};

function parseCookie(req: checkedIncomingMessage, field: string): string | undefined;
function parseCookie(req: checkedIncomingMessage): ICookies | undefined;
function parseCookie(request: any, field?: any) {
    const cookiesStr: string | undefined  = request.headers.cookie;
    if (!cookiesStr) {
        return;
    }

    let cookies: ICookies = {};

    const cookiesArr: string[] = cookiesStr.split(';');
    for (let cookie of cookiesArr) {
        const partsOfCookie: string[] = cookie.split('=');
        const [key, value] = partsOfCookie;
        cookies[key.trim()] = value;
    }

    return field ? cookies[field] : cookies; 
}

export { parseCookie, ICookies };
