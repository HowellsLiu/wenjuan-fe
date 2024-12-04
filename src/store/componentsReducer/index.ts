import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from "immer";
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from "lodash.clonedeep";
import { arrayMove } from "@dnd-kit/sortable";
export type ComponentInfoType = {
  fe_id: string; // 前端生成的id,服务端Mongodb不认这种格式, 所以自定义一个fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};
export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};
const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};
export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },
    // 修改selectedId
    // changeSelectedId:(state:ComponentsStateType,action:PayloadAction<string>)=>{
    //
    // }
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
        // react state改变不可变数据的写法
      }
    ),
    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>
      ) => {
        const newComponent = action.payload;
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((c) => c.fe_id === selectedId);
        if (index < 0) {
          // 没有selectedId, 没有选中任何组件
          draft.componentList.push(newComponent);
        } else {
          // 选中了组件,插入到index后面
          draft.componentList.splice(index + 1, 0, newComponent);
        }
        draft.selectedId = newComponent.fe_id;
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;
        // 当前要修改属性的组件
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft;
      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.selectedId = newSelectedId;
      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    }),
    // 隐藏和显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>
      ) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;
        // 重新计算selectedId
        let newSelectedId = "";
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }
        // 获取当前fe_id获取当前的component

        draft.selectedId = newSelectedId;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      }
    ),
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>
      ) => {
        const { fe_id } = action.payload;
        const { componentList } = draft;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }
    ),
    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId
      ); //找到选中的selectedId
      if (selectedComponent == null) return;
      draft.copiedComponent = cloneDeep(selectedComponent); // 深拷贝
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;
      // 要把fe_id给修改掉, 深拷贝是拷贝了所有信息
      copiedComponent.fe_id = nanoid();
      // 插入copy的组件
      insertNewComponent(draft, copiedComponent);
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (selectedIndex < 0) return; //未选中
      if (selectedIndex <= 0) return; //选中第一个,无法向上选中
      draft.selectedId = componentList[selectedIndex - 1].fe_id;
    }),
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (selectedIndex < 0) return; //未选中
      if (selectedIndex + 1 === componentList.length) return;
      draft.selectedId = componentList[selectedIndex + 1].fe_id;
    }),
    // 修改组件标题
    changeComponentTitle: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; title: string }>
      ) => {
        const { title, fe_id } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) curComp.title = title;
      }
    ),
    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
      }
    ),
  },
});
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
