import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store';


//pages
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>


);

