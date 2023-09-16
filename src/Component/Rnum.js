import React, { useState, useEffect } from 'react';

const Rnum = () => {
  const [num, setNum] = useState(null);
 const FunOne = () => {
    fetch('http://13.51.85.64:4005/generateNumber')
      .then((response) => response.json())
      .then((data) => setNum(data.number))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const FunTwo = () => {
    FunOne();
    requestAnimationFrame(FunTwo);
  };

  useEffect(() => {
    
    FunOne();
FunTwo();

  
    return () => {
      cancelAnimationFrame(FunTwo);
    };
  }, []); 

  return (
    <div>
      <p>num: {num}</p>
    </div>
  );
};

export default Rnum;