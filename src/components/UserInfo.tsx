import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { getUserInfoService } from "../services/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { Button, message, Space, Spin } from "antd";
import { removeTOKEN } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import {useDispatch} from "react-redux";
import {logoutReducer} from "../store/userReducer";

const UserInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const {username,nickname} = useGetUserInfo()
  function logout() {
    dispatch(logoutReducer()) // 清空了 redux user 数据
    // 清空token的存储
    removeTOKEN();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }
  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <Space>
          <UserOutlined />
          {nickname}
        </Space>
      </span>
      <Button type="link" onClick={logout}>
        {" "}
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;
  return <div>{username ? UserInfo : Login}</div>;
};
export default UserInfo;
