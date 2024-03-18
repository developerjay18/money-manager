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
import { Provider } from 'react-redux';
import store from './store/store.js';
import { AuthLayout } from './components/index.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/expenses"
        element={
          <AuthLayout authentication>
            <Expense />
          </AuthLayout>
        }
      />
      <Route path="/category" element={<Category />} />
      <Route
        path="/feedback"
        element={
          <AuthLayout authentication>
            <Feedback />
          </AuthLayout>
        }
      />
      <Route
        path="/auth"
        element={
          <AuthLayout authentication={false}>
            <Auths />
          </AuthLayout>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App className="dark" />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
