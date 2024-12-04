import React, { FC, useState } from "react";
import styles from "./QuestionCard.module.scss";
import {
  updateQuestionService,
  duplicateQuestionService,
} from "../services/question";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  StarFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useRequest } from "ahooks";
type propsType = {
  _id: string;// 服务端mongodb, 自动_id 不重复,在服务端创建问卷
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
const { confirm } = Modal;
const QuestionCard: FC<propsType> = (props) => {
  const nav = useNavigate();
  const { _id, title, createAt, isPublished, answerCount, isStar } = props;
  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("已更新");
      },
    }
  );
  // function duplicate() {
  //   message.success("执行复制");
  // }
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`/question/edit/${result.id}`);
      },
    }
  );
  // 删除
  const [isDeletedState,setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess(){
        message.success('删除成功')
        setIsDeletedState(true)
      }
    }
  );
  // 已经删除的问卷不要再渲染卡片了
  
  function del() {
    confirm({
      title: "确实删除该问卷",
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  }
  if(isDeletedState) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarFilled style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷:{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              disabled={deleteLoading}
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
