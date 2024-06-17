export default class WebWorker {
  constructor(worker) {
    // Convert the worker function to a string
    const code = worker.toString();

    // A Blob (Binary Large Object) is created from the stringified function code.
    // Create a Blob containing the worker code wrapped in a self-executing function
    const blob = new Blob(["(" + code + ")()"]); // IIFE

    // Create a URL for the Blob and return a new Web Worker using that URL
    /**
     * A temporary URL is created for the Blob using URL.createObjectURL(blob).
     * This URL acts like an external script file URL.
     */
    return new Worker(URL.createObjectURL(blob));
  }
}

/**
 * Summary
    Blob: A Blob is used to create an object URL that can be passed to the Worker constructor, 
          enabling the use of inline worker scripts.
    Inline Worker Script: By converting a function to a string, creating a Blob, 
            and generating a URL, you can embed worker code directly in your main JavaScript file 
                    without needing a separate worker script file.
    Security and Convenience: This method is convenient for small or dynamic worker scripts and 
            ensures the worker code is encapsulated within the main script.
 */

/**
   * 1. Why we need a blob ?
   * A Blob (Binary Large Object) is used in this context
   * to create a URL that can be used to initialize a Web Worker
   * from a function defined within the same script. 
   * Here’s a detailed explanation of why a Blob is needed and how it is used:
   * Web Worker Script Source Requirement:
        Web Workers require an external script file or a URL to initialize.
        They cannot directly execute JavaScript functions passed as arguments in the main script.
        Normally, a Web Worker is created with a URL pointing to an external JavaScript file
   */
