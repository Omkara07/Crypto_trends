import React from 'react';
import { createRoot } from 'react-dom/client';
import './input.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Trending from './components/Trending';
import Watchlist from './components/Watchlist';
import Top10 from './components/Top10';
import SlugItem from './components/SlugItem';
import { createContext } from "react";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";
import Login from './components/Login';
import Signup from './components/Signup';

export const Data = createContext();
const Layout = () => {
  return (
    <Provider store={appStore}>
      <Data.Provider value={"Anmol"}>
        <div className='h-full bg-[#120d17] text-white'>
          <Navbar />
          <Outlet />
        </div>
      </Data.Provider>
    </Provider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/trending', element: <Trending /> },
      { path: '/watchlist', element: <Watchlist /> },
      { path: '/top10', element: <Top10 /> },
      { path: '/coin/:id', element: <SlugItem /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
