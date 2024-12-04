import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType;
  components:StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    //用户数据
    user: userReducer,
    //组件列表数据(复杂, undo redo)
    // components: componentsReducer, 无undo
    components: undoable(componentsReducer,{
      limit:20,//限制20步
      filter:excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    // 页面信息
    pageInfo: pageInfoReducer,
  },
});
