export const once = (fn: Function, isWasCalled: boolean = false): Function | undefined => 
(...args: any[]): any => !isWasCalled ? (isWasCalled = true, fn(...args) ) : undefined; 