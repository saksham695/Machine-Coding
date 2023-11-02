import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "../utils";

export default function useFetch(query, isFetch, transformData, promise, debounceDelayTime) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!query || (query && !isFetch)) {
			setData(null);
			setError(null);
         setIsLoading(false);
			return;
		}
      const controller = new AbortController();
      const signal = controller.signal;

		fetchData(query, signal);

      return () => {
         controller.abort();
      }
	}, [query]);

	const fetchData = debounce(async (query, signal) => {
      try {
         setIsLoading(true);
         setData(null);
         setError(null);
         const res = await promise(query, signal);
         const json = await res.json();
         setData(transformData(json));
      } catch (error) {
         if(error.name === "AbortError") {
            return;
         }
         setError(error.message);
      } finally {
         setIsLoading(false);
      }
	}, debounceDelayTime);

	return {
		data,
		error,
      isLoading,
      setData
	};
}
