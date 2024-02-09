import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

// if (rootElement !== null) {
//   const root = createRoot(rootElement);
//   root.render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// } else {
//   console.error("Could not find root element");
//   console.error(document);
//   console.error(rootElement);
//   throw new Error("Could not find root element");
// }
// }
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
