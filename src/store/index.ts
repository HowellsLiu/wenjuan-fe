import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
export type StateType = {
  user: UserStateType;
  components: ComponentsStateType;
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    //用户数据
    user: userReducer,
    //组件列表数据(复杂, undo redo)
    components: componentsReducer,
    // 页面信息
    pageInfo: pageInfoReducer,
  },
});
