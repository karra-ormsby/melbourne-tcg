import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Categories from './pages/Categories'
import Category from './components/Category';
import Items from './pages/Items';
import Item from './components/Item'
import AddListings from './pages/AddListings';
import AddCategories from './pages/AddCategories';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Melbourne TCG</h1>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<Category />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:itemId" element={<Item />} />
            <Route path="/additems" element={<AddListings />} />
            <Route path="/addcategories" element={<AddCategories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
