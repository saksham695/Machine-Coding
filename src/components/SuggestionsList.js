import React from 'react'

const SuggestionsList = ({items, activeIndex}) => {
   return (
      <ul className="suggestion-list">
         {items.map((item, index) => (
            <li 
               key={index} 
               className={`suggestion-item ${activeIndex === index &&  "active-item"}`}
            >
               {item.title}
            </li>
         ))}
      </ul>
   )
}

export default SuggestionsList