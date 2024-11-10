import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import { Typography, Empty, Table, Tag, Button, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
const { Title } = Typography;
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "3月10日 13:56",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: false,
    answerCount: 9,
    createAt: "3月14日 13:56",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 23,
    createAt: "3月17日 13:56",
  },
];
const Trash: FC = () => {
  useTitle("小刘问卷-回收站");
  const { confirm } = Modal;
  const [questionList, setQuestionList] = useState(rawQuestionList);
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
  function del() {
    confirm({
      title: "确认彻底删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可以找回",
      onOk: () => alert(`删除${JSON.stringify(selectedIds)}`),
    });
  }
  // 可以把JSX片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
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
        <div className={styles.right}><ListSearch /></div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  );
};
export default Trash;
