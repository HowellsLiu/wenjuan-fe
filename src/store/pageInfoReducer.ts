import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";
export type PageInfoType = {
  title: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};
const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  js: "",
  css: "",
};
const PageInfoSlice = createSlice({
  name: "pageInfo",
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (
      state: PageInfoType,
      action: PayloadAction<PageInfoType>
    ) => {
      return action.payload;
    },
    changePageTitle: produce(
      (draft: PageInfoType, action: PayloadAction<string>) => {
        draft.title = action.payload;
      }
    ),
  },
});
export const { resetPageInfo, changePageTitle } = PageInfoSlice.actions;
export default PageInfoSlice.reducer;
