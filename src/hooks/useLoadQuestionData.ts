import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuestionData() {
  const { id = "" } = useParams(); //在函数组件中访问 URL 路径中的动态参数
  const dispatch = useDispatch();
  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷id");
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    }
  );
  // 根据获取的data设置redux的store
  useEffect(() => {
    if (!data) return;
    const {
      title = "",
      componentList = [],
      desc = "",
      js = "",
      css = "",
      isPublished=false
    } = data;
    // 把componentList存储到Redux Store中
    // 获取默认的selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
    // 把pageInfo存储到Redux store中
    dispatch(resetPageInfo({ title, desc, js, css,isPublished }));
  }, [data]);
  // 根据id变化来监听数据, id变了就重新加载数据
  useEffect(() => {
    run(id);
  }, [id]);
  return { loading, error };
}
export default useLoadQuestionData;
