import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import CatGallery from "./Pages/CatGallery";
import CatDatasheet from "./Pages/CatDatasheet";
import CatList from "./Pages/CatList";
import CatCreator from "./Pages/CatCreator";
import CatEditor from "./Pages/CatEditor";
import Breeders from "./Pages/Breeders";
import BreederList from './Pages/BreederList';
import BreederCreator from './Pages/BreederCreator';
import BreederEditor from './Pages/BreederEditor';


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
        path: "/catdatasheet/:id",
        element: <CatDatasheet />,
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
        path: "/cateditor/:id",
        element: <CatEditor />,
      },
      {
        path: "/breeders",
        element: <Breeders />,
      },
      {
        path: "/breederlist",
        element: <BreederList />,
      },
      {
        path: "/breedercreator",
        element: <BreederCreator />,
      },
      {
        path: "/breedereditor/:id",
        element: <BreederEditor />,
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
