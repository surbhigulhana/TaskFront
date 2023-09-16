import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Random from './Component/Random';
import Crud from './Component/Crud';
import Rnum from './Component/Rnum';


const App = () => {
 
  return (
    <div>
  <Router>
        <Routes>
          <Route exact path="/" element={<Random />}></Route>
          <Route exact path="/Crud" element={<Crud />}></Route>
          <Route exact path="/Random" element={<Rnum/>}></Route>
          </Routes>
          </Router>
      


    </div>
  )
}

export default App
