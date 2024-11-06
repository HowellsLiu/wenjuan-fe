import React, { FC, useState } from "react";
import styles from "./List.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useSearchParams } from "react-router-dom";
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 23,
    createAt: "3月17日 13:56",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: "3月23日 16:56",
  },
];
const List: FC = () => {
  const [searchParams] = useSearchParams()
  console.log("keyword",searchParams.get('keyword'));
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
            <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
            (搜索)
        </div>
      </div>
      
      <div className={styles.content}>
        {questionList.map(q=>{
            const {_id} = q
            return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>
        List Page Footer
      </div>
    </>
  );
};
export default List;