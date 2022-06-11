import React from "react";
import ReactDOM from "react-dom/client"; // react 18
import App from "./App";

// react 18
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// import ReactDOM from 'react-dom'; // react 16

// // react 16
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
