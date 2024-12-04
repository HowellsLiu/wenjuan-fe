import React, { FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Checkbox, Form, Input } from "antd";
const { TextArea } = Input;
const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const [form] = Form.useForm();
  const { text, isCenter, onChange, disabled } = props;
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  function handleValuesChange() {
    // 使用onchange
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "请输入段落内容" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
