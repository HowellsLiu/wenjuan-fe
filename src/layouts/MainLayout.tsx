import React, {FC} from "react";
import {Outlet} from "react-router-dom"; //类似于插槽
import useLoadUserData from "../hooks/useLoadUserData";
import styles from './MainLayout.module.scss'
import {Layout, Spin} from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import useNavPage from "../hooks/useNavPage";

const {Header, Content, Footer} = Layout
const MainLayout: FC = () => {
    const {waitingUserData} = useLoadUserData();
    useNavPage(waitingUserData)
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

                    {waitingUserData ? <div style={{textAlign: 'center',marginTop:'60px'}}><Spin/></div> : <Outlet/>}
                </Content>
            </Layout>

            <Footer className={styles.footer}>小刘问卷 &copy;2024 - present. Created by 小刘</Footer>
        </Layout>
    );
};
export default MainLayout;
