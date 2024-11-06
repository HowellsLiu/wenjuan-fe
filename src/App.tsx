import React from "react";
// import List from "./pages/manage/List";
import routerConfig from './router'
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig}></RouterProvider>
    </div>
  );
}
export default App;
