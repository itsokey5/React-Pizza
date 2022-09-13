import React, { Suspense } from 'react'

import Header from './components/header/header';
import './scss/app.scss';
import  Home  from './pages/Home';
// import NotFound from "./pages/notFound";
import {  Routes, Route } from "react-router-dom";
// import Cart from './pages/Cart';
// import FullPizza from './pages/Fullpizza';



const Cart = React.lazy(() => import( './pages/Cart'));
const FullPizza = React.lazy(() => import( './pages/Fullpizza'));
const NotFound = React.lazy(() => import("./pages/notFound"));


function App() {



  return (


      <div className="wrapper">
        <Header  />
      <div className="content">
        
          <Routes>
          <Route path="/" element={<Home   />}/>
          <Route path="/cart" element={<Suspense>
            <Cart />
          </Suspense>}/>
          <Route path="*" element={<Suspense>
            <NotFound/>
          </Suspense>}/>
          <Route path="/pizza/:id" element={<Suspense>
            <FullPizza/>
          </Suspense>}/>
          </Routes>
        
      </div>
    </div>
  
    
  )
}

export default App;



