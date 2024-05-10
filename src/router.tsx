import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Graphql from './Graphql.tsx';
import App from './App.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Graphql />,
  },
  {
    path: '/app',
    element: <App />,
  },
]);

export default routes;
