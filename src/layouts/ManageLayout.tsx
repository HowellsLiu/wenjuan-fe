import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; //类似于插槽
import styles from "./ManageLayout.module.scss";
import { createQuestionService } from "../services/question";
import { Button, Space, Divider, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  // const [loading,setLoading] = useState(false)
  // async function handleCreateClick(){
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const {id} = data||{}
  //   if(id){
  //     nav(`/question/edit/${id}`)
  //     message.success("创建成功")
  //   }
  //   setLoading(false)
  // }
  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav("/manage/list");
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav("/manage/star");
            }}
          >
            标星问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav("/manage/trash");
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default ManageLayout;
