import { useState, useEffect, useRef } from "react";
import useBookSearch from "./hooks/useBookSearch";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
   const {isloading, data, error} = useBookSearch(query, pageNumber);
   const [lastElement, setLastElement] = useState(null);

   const observerRef = useRef(
      new IntersectionObserver(entries => {
         if(entries[0].isIntersecting) {
            setPageNumber((prevPage) => prevPage + 1);
         }
      })
   );

   useEffect(() => {
      let observer = observerRef.current;

      if(lastElement) {
         observer.observe(lastElement);
      }

      return () => {
         if(lastElement) {
            observer.unobserve(lastElement);
         }
      }
   }, [lastElement]);

   const handleSearch = (e) => {
      setQuery(e.target.value);
      setPageNumber(1);
   }

	return (
      <div className="App">
         <h1>Infinite Scroll Using Intersection Observer</h1>
         <input type="text" placeholder="Enter Book title" value={query} className="search-input" onChange={handleSearch} />

         <div className="list-container">
            {data.map((title, index) => {
                  if(index === data.length - 1 && !isloading) {
                     return (
                        <div ref={setLastElement} key={index}>
                           <p className="list-item">
                              {title}
                           </p>
                        </div>
                     )
                  } 
                  return (
                     <p key={index} className="list-item">
                        {title}
                     </p>
                  )
               }
            )}
         </div>
         {isloading && <p className="loader">LOADING...</p>}
         {error && <p className="error-message">Something went wrong... {error?.message}</p>}
      </div>
   );
}

export default App;
