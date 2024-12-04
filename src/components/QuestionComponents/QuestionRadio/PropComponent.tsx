import React, { FC, useEffect } from "react";
import { QuestionRadioPropsType, OptionType } from "./interface";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [title, isVertical, value, options]);
  function handleValuesChange() {
    if (onChange == null) return;
    // 触发onChange函数
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    // 需要清除text undefined 选项
    if(newValues.options){
      newValues.options = newValues.options.filter(opt=>!(opt.text==null))
    }
    const {options=[]} = newValues
    options.forEach(opt=>{
      if(opt.value) return
      opt.value = nanoid(5)
    })
    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项输入框 */}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++;// 记录text相同的个数,预期只有一个
                            });
                            if(num===1) return Promise.resolve()
                              return Promise.reject(new Error("和其他选项重复"))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字"></Input>
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({
            value,
            label: text || "",
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
