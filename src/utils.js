export const debounce = (callbackFn, delay = 200) => {
   let timerId;

   return function(...args) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
         callbackFn(...args)
      }, delay);
   }
}

export const inputStyles = {
   padding: "10px 20px",
   width: "550px",
   borderRadius: "20px"
}
