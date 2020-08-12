export default (ip: string): string => {
    const isIPv6 = ip.includes(':');

    if (isIPv6) return ip
                        .split(':')
                        .reduce((sum: number, current: string) => {
                            const currentInt: number | typeof NaN = parseInt(current, 16);

                            return isNaN(currentInt) ? 0 : sum + currentInt;
                        }, 0)
                        .toString();
    else return ip
                 .split('.')
                 .reduce((sum: number, current: string) => sum + +current, 0)
                 .toString();
}
