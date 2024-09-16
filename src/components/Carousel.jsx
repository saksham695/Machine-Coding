import React, { useEffect, useRef, useState } from 'react'
import styles from "./Carousel.module.css";

const Carousel = ({images, showArrows, showIndicators, autoPlay, interval, infinite}) => {
   const [currIndex, setCurrIndex] = useState(0);
   const intervalRef = useRef();

   useEffect(() => {
      if(autoPlay) {
         intervalRef.current = setInterval(() => {
            setCurrIndex(prevIndex => {
               if(prevIndex === images.length - 1) {
                  if(infinite) return 0;
                  else {
                     clearInterval(intervalRef.current);
                     return images.length - 1;
                  }
               }
               return prevIndex + 1;
            });
         }, interval);
      }

      return () => {
         if(intervalRef.current) clearInterval(intervalRef.current);
      }
   }, []);

   const handlePrev = () => {
      if(currIndex === 0) {
         if(infinite) setCurrIndex(images.length - 1);
         return;
      }
      setCurrIndex(currIndex => currIndex - 1);
   }

   const handleNext = () => {
      if(currIndex === images.length - 1) {
         if(infinite) setCurrIndex(0);
         return;
      }
      setCurrIndex(currIndex => currIndex + 1);
   }

   const handleIndicatorClick = (index) => {
      setCurrIndex(index);
   }

   return (
      <div className={styles.carouselContainer}>
         <div className={styles.carousel}>
            {images.map((imgUrl, index) => (
               <img key={index} src={imgUrl} alt="carousel-img" className={`${styles.img} ${currIndex === index ? styles.active : ''}`} />
            ))}
         </div>

         {showArrows && 
            <>
               <div className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>&lt;</div>
               <div className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>&gt;</div>
            </>
         }

         {showIndicators && 
            <div className={styles.indicators}>
               {Array.from({length: images?.length}).map((_, index) => (
                  <span 
                     key={index} 
                     className={`${styles.indicator} ${index === currIndex ? styles.indActive : ''}`}
                     onClick={() => handleIndicatorClick(index)}
                  ></span>
               ))}
            </div>
         } 
      </div>
   )
}

export default Carousel
