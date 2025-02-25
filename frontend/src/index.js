import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './styles/index.css';
import store from './redux/store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Includes Popper.js
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();



// Use ReactDOM.render instead of createRoot for React 17
ReactDOM.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
