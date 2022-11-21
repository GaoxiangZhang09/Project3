import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";




// ========================================

//recmandation: whole react app, just use one time of document.querySelector, is here.
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
