import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';

import Categories from './pages/Categories'
import Category from './components/Category';
import Item from './components/Item'
// import Items from './pages/Items';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Melbourne TCG</h1>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<Category />} />
        <Route path="/items/:itemId" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
