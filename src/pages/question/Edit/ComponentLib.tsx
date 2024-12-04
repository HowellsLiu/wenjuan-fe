import React, {FC} from "react";
import { componentConfGroup, ComponentConfType } from "../../../components/QuestionComponents";
import styles from './ComponentLib.module.scss'
import { Typography } from "antd";
import { addComponent } from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
const {Title} = Typography
function GenComponent(c:ComponentConfType){
    const {title,type,Component,defaultProps} = c
    const dispatch = useDispatch()
    function handleClick(){
        dispatch(
            addComponent({
                fe_id:nanoid(), // 前端生成的id
                title,
                type,
                props:defaultProps
            })
        )
    }
    return (
        <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
            <Component/>
            </div>
            
        </div>
    )
}
const Lib:FC = ()=>{
    return <>
    {componentConfGroup.map((group,index)=>{
        const {groupId,groupName,components} = group
        return <div key={groupId}>
            <Title level={3} style={{fontSize:'16px',marginTop:index>0?'20px':'0'}}>{groupName}</Title>
            <div>{components?.map(c=>GenComponent(c))}</div>
        </div>
    })}
    </>
}
export default Lib;