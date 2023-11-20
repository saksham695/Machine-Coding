import React, { useState } from 'react'

const Accordion = ({title, data, expandIcon}) => {
   const [openIndex, setOpenIndex] = useState(null);

   const handleClick = (e) => {
      const index = +e.target.dataset.accordionid;
      setOpenIndex(openIndex === index ? null : index);
   }

   return (
      <div className="accordion-container">
         <h2 className="accordion-title">{title}</h2>
         <div className="accordion-items-container" onClick={handleClick}>
            {data?.map((data, index) => (
               <div key={index} className="accordion-item">
                  <div className="accordion-summary" data-accordionid={index}>
                     <span className="summary-text">{data?.summary}</span>
                     <span className={`expand-icon ${openIndex === index ? "up" : ""}`}>
                        {expandIcon}
                     </span>
                  </div>
                  <div className={`accordion-details ${openIndex === index ? "show" : ""}`}>
                     {data?.details}
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Accordion