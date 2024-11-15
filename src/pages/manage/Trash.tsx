import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import { useRequest, useTitle } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";
const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle("小刘问卷-回收站");
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
      // key:'title', //循环列的key， 会默认取dataIndex的值
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        // 当前这一列根据数据源返回自定义的JSX片段
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
    },
  ];
  // 恢复
  const { run: recovery } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success("恢复成功");
        refresh();
        setSelectedIds([])
      },
    }
  );
  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      onSuccess(){
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      }
    }
  );
  function del() {
    confirm({
      title: "确认彻底删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可以找回",
      onOk: deleteQuestion,
    });
  }
  // 可以把JSX片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedIds.length === 0}
            onClick={recovery}
          >
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            // console.log("selectedRowKeys",selectedRowKeys);
            setSelectedIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};
export default Trash;
