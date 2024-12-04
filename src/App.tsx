import React from "react";
// import List from "./pages/manage/List";
import 'antd/dist/reset.css'
import routerConfig from './router'
import { RouterProvider } from "react-router-dom";
import './App.css'
function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}
export default App;
