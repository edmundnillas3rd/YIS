import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { IconContext } from "react-icons";

import "./styles/index.css";

import router from './routes/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconContext.Provider value={{ color: "white" }}>
      <RouterProvider router={router} />
    </IconContext.Provider>
  </React.StrictMode>,
);
