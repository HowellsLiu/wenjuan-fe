import axios, { ResDataType } from "./ajax";
type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number; //当前多少页
  pageSize: number; //每页多少条
};
// 获取单个问卷
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDataType;
  return data;
}
// 获取(查询)问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption> //只要类型符合,只有一部分也行
): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: any
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}
// 复制问卷
export async function duplicateQuestionService(
  id: string
): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}
// 批量彻底删除
export async function deleteQuestionService(ids:string[]):Promise<ResDataType>{
  const url = '/api/question'
  const data = (await axios.delete(url,{data:{ids}})) as ResDataType
  return data
}