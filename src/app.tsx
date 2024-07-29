import React from "react";
import { createRoot } from 'react-dom/client';
import Home from './index';
import Demo from './demo';
import DemoResponsive from './demo/responsive-layout';
import Result404 from './exception/404';
import '@csstools/normalize.css';
import {
    createBrowserRouter,
    BrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "",
        Component: Home,
    },
    {
        path: "demo",
        Component: Demo,
    },
    {
        path: "demo/responsive-layout",
        Component: DemoResponsive
    },
    {
        path: '*',
        Component: Result404,
    }
]);

const root = createRoot(document.getElementById('app'));
root.render(
    <>
    <RouterProvider router={router} />
    </>
);