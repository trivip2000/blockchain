// import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Homepage from '@/pages/Homepage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
]);

export default routes;
