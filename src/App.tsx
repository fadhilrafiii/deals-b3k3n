import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingPage from 'Components/LoadingPage';
import Navbar from 'Components/Navbar';

const MyBooks = lazy(() => import('Pages/MyBooks'));
const BooksByCategory = lazy(() => import('Pages/BooksByCategory'));
const BookDetail = lazy(() => import('Pages/BookDetail'));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<MyBooks />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/books" element={<BooksByCategory />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
