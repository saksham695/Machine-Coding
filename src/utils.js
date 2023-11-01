export const debounce = (callbackFn, delay = 500) => {
   let timerId;

   return function(...args) {
      if(timerId) {
         clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
         callbackFn(...args)
      }, delay);
   }
}