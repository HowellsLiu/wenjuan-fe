import React, { FC, useRef } from "react";
import styles from "./StatHeader.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Input,
  InputRef,
  message,
  Popover,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { QRCodeSVG } from "qrcode.react";
const { Title } = Typography;
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { title, isPublished } = useGetPageInfo();
  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);

  function copy() {
    //拷贝
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中input的内容
    document.execCommand("copy"); //拷贝选中内容(富文本编辑器的操作)
    message.success("拷贝成功");
  }
  function genLinkAndQRCodeElem() {
    if (!isPublished) return null;
    const url = `http://localhost:3000/question/${id}`; //拼接URL需要参考C端的规则
    // 定义二维码组件
    const QRCodeElem = (
      <div>
        <QRCodeSVG value={url} size={150} />
      </div>
    );
    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
            <Button icon={<QrcodeOutlined/>}></Button>
        </Popover>
      </Space>
    );
  }
  const { id } = useParams();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StatHeader;
