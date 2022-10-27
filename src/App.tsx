import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from 'Components/Navbar';

const MyBooks = lazy(() => import('Pages/MyBooks'));
const BooksByCategory = lazy(() => import('Pages/BooksByCategory'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/" element={<MyBooks />} />
            <Route path="/books" element={<BooksByCategory />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
