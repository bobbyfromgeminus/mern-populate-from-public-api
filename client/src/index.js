import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import CatList from "./Pages/CatList";
import CatCreator from "./Pages/CatCreator";
import CatEditor from "./Pages/CatEditor";
import CatGallery from "./Pages/CatGallery";
import CatDatasheet from "./Pages/CatDatasheet";
import Breeders from "./Pages/Breeders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CatGallery />,
      },
      {
        path: "/catlist",
        element: <CatList />,
      },
      {
        path: "/catcreator",
        element: <CatCreator />,
      },
      {
        path: "/catdatasheet/:id",
        element: <CatDatasheet />,
      },
      {
        path: "/cateditor/:id",
        element: <CatEditor />,
      },
      {
        path: "/breeders",
        element: <Breeders />,
      },
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
