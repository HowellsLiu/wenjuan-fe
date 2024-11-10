import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
const { Search } = Input;
const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handleSearch(value: string) {
    // 跳转页面, 增加URL参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }
  const [value, setValue] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  // 刷新后搜索框里依然还要有这个值
  // 获取URL参数, 并设置到input value
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]); //每当searchParams变化就执行回调函数
  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={value}
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: "260px" }}
    />
  );
};
export default ListSearch;
