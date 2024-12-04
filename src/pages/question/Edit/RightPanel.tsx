import React, { FC, useEffect, useState } from "react";
import ComponentProp from "./ComponentProp";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
// 枚举
enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}
const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY);
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);
  const tabsItems = [
    {
      key: "prop",
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: "setting",
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};
export default RightPanel;
