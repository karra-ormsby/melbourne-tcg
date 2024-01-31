import React from 'react';
import './App.css';

import Categories from './pages/Categories'
// import Items from './pages/Items';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Melbourne TCG</h1>
      </header>
      <Categories />
      {/* <Items /> */}
        
    </div>
  );
}

export default App;
