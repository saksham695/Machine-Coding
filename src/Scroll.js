import "./App.css";
import { useEffect, useRef, useState } from "react";

var my_array = [];

for (var i = 1; i <= 1000; i++) {
  my_array.push(i);
}

const PAGE_SIZE = 10;
const START_PAGE = 0;

const getPageData = (start, end) => {
    console.log(start,end)
  return my_array.slice(start, end);
};

export const Scroll = () => {
  const pageRef = useRef(START_PAGE);
  const scrollRef = useRef(null);
  const [data, setData] = useState(
    getPageData(pageRef.current * PAGE_SIZE, pageRef.current + 1 * PAGE_SIZE)
  );

  console.log(data)

  useEffect(() => {
    const observer = new IntersectionObserver((enteries) => {
        if(enteries[0].isIntersecting){
            pageRef.current+=1
            setData((prev)=>{
                return [...prev,...getPageData(pageRef.current * PAGE_SIZE, (pageRef.current + 1) * PAGE_SIZE)]
            })
        }
    });
    observer.observe(scrollRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {data.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              height: "70px",
              width: "50px",
              background: "yellow",
              marginTop: "10px",
            }}
          >
            {index}
          </div>
        );
      })}
      <div
        ref={scrollRef}
       
      />
    </div>
  );
};
