import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './index';
import Demo from './demo';
import DemoResponsive from './demo/responsive-layout';
import './style/index.scss';
import Result404 from './exception/404';
import '@csstools/normalize.css';
import Layout from './Layout';

import { NavLink, createBrowserRouter, BrowserRouter, RouterProvider } from 'react-router-dom';
const route = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', Component: Home },
            { path: '/demo', Component: Demo },
        ],
    },
    { path: '/demo/responsive-layout', Component: DemoResponsive },
    { path: '*', Component: Result404 },
];

const router = createBrowserRouter(route);

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
