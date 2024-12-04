import { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(
  fe_id: string, //当前Id
  componentList: ComponentInfoType[] //组件列表
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";
  // 重新计算selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length <= 1) {
    // 组件长度就1个，被删除了就没有组件了
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      //要删除最后一个，就要选中上一个
      newSelectedId = componentList[index - 1].fe_id;
    } else {
      // 要删除的不是最后一个就要选中下一个
      newSelectedId = componentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
// 插入新组件
export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const {selectedId,componentList} = draft
  const index = componentList.findIndex(c=>c.fe_id===selectedId)
  if(index<0){
    draft.componentList.push(newComponent)
  }else{
    draft.componentList.splice(index+1,0,newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
