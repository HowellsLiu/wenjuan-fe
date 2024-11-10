import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import { Typography, Empty } from "antd";
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
    isStar: true,
    answerCount: 9,
    createAt: "3月14日 13:56",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: true,
    answerCount: 23,
    createAt: "3月17日 13:56",
  },
];
const List: FC = () => {
  useTitle("小刘问卷-标星问卷");
  const [searchParams] = useSearchParams();
  console.log("keyword", searchParams.get("keyword"));
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>标星问卷</Title>
        </div>
        <div className={styles.right}><ListSearch /></div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};
export default List;
