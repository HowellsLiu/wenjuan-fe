import React, { FC } from "react";
import { Outlet } from "react-router-dom"; //类似于插槽
import styles from './MainLayout.module.scss'
const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout Header</div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>MainLayout Footer</div>
    </>
  );
};
export default MainLayout;
