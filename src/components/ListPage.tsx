import { Pagination } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  // 从url参数中找到page pageSize, 并且同步到Pagination组件中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);
  // 当page pageSize改变时,跳转页面(改变url参数)
  const nav = useNavigate()
  const {pathname} = useLocation()
  function handlePageChange(page:number,pageSize:number){
    searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
    nav({
        pathname,
        search:searchParams.toString(), //a=1&b=2&c=3 这种类型
        // 除了改变page和pageSize之外.其他的url参数要带着
    })
  }
  return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />;
};
export default ListPage;
