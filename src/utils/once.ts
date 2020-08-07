export default function once(fn: Function): any {
    let isWasCalled = false;
  
    return function() {
      if (isWasCalled) return;
  
      fn.apply(null, arguments);
  
      isWasCalled = true;
    }
}
