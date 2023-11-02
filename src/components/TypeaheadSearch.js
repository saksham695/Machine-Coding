import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const TypeaheadSearch = ({
	inputId,
	placeholderText,
	debounceDelayTime,
	autocomplete,
	renderItems,
	styling,
   loader,
	noResultsMessage,
	errorMessage,
   transformData,
   promise
}) => {
   const [query, setQuery] = useState("");
   const [activeIndex, setActiveIndex] = useState(null);
   const [isFetch, setIsFetch] = useState(true);
   const {data, isLoading, error, setData} = useFetch(query, isFetch, transformData, promise, debounceDelayTime);

   const handleChange = (e) => {
      setQuery(e.target.value);
   }

   const handleKeyDown = (e) => {
      const keyCode = e.keyCode;
      if(keyCode === 13) {
         // enter
         if(activeIndex === null) return;

         setQuery(data[activeIndex]?.title);
         setData(null);
         setActiveIndex(null);
         setIsFetch(false);
         return;
      } 
      if(!isFetch) {
         setIsFetch(true);
      }
      
      if(keyCode === 40) {
         // move down
         if(activeIndex === null || activeIndex === data.length - 1) {
            setActiveIndex(0);
         } else {
            setActiveIndex(prevActiveIndex => prevActiveIndex + 1);
         }
      } 
      if(keyCode === 38) {
         // move up
         if(activeIndex === null || activeIndex === 0) {
            setActiveIndex(data.length - 1);
         } else {
            setActiveIndex(prevActiveIndex => prevActiveIndex - 1);
         }
      }
   }

	return (
		<div className="typeahead-container">
			<input
				type="text"
				id={inputId}
				placeholder={placeholderText}
				value={query}
				onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={styling.input}
			/>

         {query && isLoading && loader()}
         {query && !isLoading && data && data.length===0 && noResultsMessage()}
         {query && data && data.length > 0 && renderItems(data, activeIndex)}
         {query && error && errorMessage(error)}
		</div>
	);
};

export default TypeaheadSearch;
