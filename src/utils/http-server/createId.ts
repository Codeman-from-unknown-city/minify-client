const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

function random(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function sumIp(ip: string): string {
    const isIPv6 = ip.includes(':');
    const result: number = isIPv6 
    ? ip
        .split(':')
        .reduce((sum: number, current: string) => {
            const currentInt: number | typeof NaN = parseInt(current, 16);
   
            return isNaN(currentInt) ? 0 : sum + currentInt;
        }, 0)    
    : ip
        .split('.')
        .reduce((sum: number, current: string) => sum + +current, 0);

    return result.toString();
}

export default function createId(ip: string): string {
    let id: string = '';

    for (let counter: number = 0; counter < 12; counter++) {
        const i: number = random(0, 25);
        id += random(0, 10) <= 5 ? ALPHABET[i] : ALPHABET[i].toUpperCase();
    }

    return id + sumIp(ip);
}
