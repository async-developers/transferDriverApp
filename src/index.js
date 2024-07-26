import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";

ReactDOM.render(
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>,
  document.getElementById("root")
);
