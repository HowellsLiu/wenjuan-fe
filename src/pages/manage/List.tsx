import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { Typography, Spin, Empty } from "antd";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;

const List: FC = () => {
  // const [list, setList] = useState([]);
  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService();
  //     const { list = [], total = 0 } = data;
  //     setList(list);
  //     setTotal(total);
  //   }
  //   load()
  // }, []);
  useTitle("小刘问卷-我的问卷");
  const [started, setStared] = useState(false); // 是否已经开始加载(防抖有延迟时间)
  const [page, setPage] = useState(1); // List页面内部数据,不会在url中体现
  const [list, setList] = useState([]); // 全部列表数据, 累计的
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  // keyword变化时重置信息
  useEffect(() => {
    setStared(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      //将run命名为load
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );
  // 尝试触发加载-防抖
  const containerRef = useRef<HTMLDivElement>(null);

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      //run重命名为tryLoadMore
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load(); //真正加载
        setStared(true);
      }
    },
    {
      wait: 1000,
    }
  );
  //1.页面加载或keyword变化时触发加载
  useEffect(() => {
    tryLoadMore(); //加载第一页, 初始化
  }, [searchParams]);
  // 页面滚动时尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); // 防抖
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore); //解绑时间,重要!!!
    };
  }, [searchParams, haveMoreData]);
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, total, haveMoreData]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};
export default List;
