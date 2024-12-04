// 段落组件
import PropComponent from "./PropComponent";
import Component from "./Component";
import { QuestionParagraphDefaultProps } from "./interface";
export * from "./interface";
// Paragraph组件的配置
export default {
  title: "段落",
  type: "questionParagraph",
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
