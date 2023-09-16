import React, { useState, useEffect } from 'react'

const Random = () => {
  const [number, setNumber] = useState(null);
  const getNum = async () => {
    fetch('http://13.51.85.64:4005/generateNumber')
      .then((response) => response.json())
      .then((data) => setNumber(data.number))
      .catch((error) => console.error('Error fetching data:', error));
  };
  useEffect(() => {
    getNum();
  }, []);
  console.log(number)


  return (
    <div>
      <div className='card'>

        <h1>Random Number: {number !== null ? number : 'Empty'}</h1>
        <br/>
        <button className='btn btn-success' onClick={getNum} style={{width:"28%"}}>Generate Number</button>


      </div>
    </div>
  )
}

export default Random
