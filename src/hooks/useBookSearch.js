import {useState, useEffect} from 'react'
import { debounce } from '../utils';

export default function useBookSearch(query, pageNumber) {
   const [data, setData] = useState([]);
	const [isloading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

   useEffect(() => {
      let abortController = new AbortController();
      let signal = abortController.signal;

      if(query) {
         debouncedFetch(signal);
      } else {
         setData([]);
         setIsLoading(false);
         setError(null);
      }

      return () => {
         abortController.abort();
      }
	}, [query, pageNumber]);

   const fetchData = async (signal) => {
		try {
			setIsLoading(true);
			setError(null);

			const res = await fetch(
				`https://openlibrary.org/search.json?q=${query}&page=${pageNumber}&limit=10`,
            { signal: signal }
			);
			const json = await res.json();
			const titles = json?.docs?.map((doc) => doc.title);

			setData((prevData) => prevData.concat(titles));
		} catch (err) {
         if(err.name === 'AbortError') 
            return;
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

   const debouncedFetch = debounce(fetchData, 1000);

   return {isloading, data, error};
}
