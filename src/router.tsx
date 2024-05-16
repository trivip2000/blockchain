// import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Homepage from '@/pages/Homepage';
import About from '@/pages/About';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

export default routes;
