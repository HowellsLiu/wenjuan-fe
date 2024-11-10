import React, { FC } from "react";
import { Outlet } from "react-router-dom"; //类似于插槽
import styles from './MainLayout.module.scss'
import { Layout } from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
const { Header, Content, Footer } = Layout
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Layout className={styles.main}>
      <Content>
        <Outlet></Outlet>
      </Content>
      </Layout>
      
      <Footer className={styles.footer}>小刘问卷 &copy;2024 - present. Created by 小刘</Footer>
    </Layout>
  );
};
export default MainLayout;
