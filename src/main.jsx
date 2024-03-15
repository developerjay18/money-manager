import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Auths, Category, Expense, Feedback, Home } from './pages/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/category" element={<Category />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/auth" element={<Auths />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App className="dark" />
    </RouterProvider>
  </React.StrictMode>
);
