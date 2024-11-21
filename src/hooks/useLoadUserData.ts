import {useEffect, useState} from "react";
import useGetUserInfo from "./useGetUserInfo";
import {getUserInfoService} from "../services/user";
import {useRequest} from "ahooks";
import {useDispatch} from "react-redux";
import {loginReducer} from "../store/userReducer";

function useLoadUserData() {
    const dispatch = useDispatch();
    const [waitingUserData,setWaitingUserData] = useState(true)
    // ajax 加载用户信息
    const {run} = useRequest(getUserInfoService,
        {
            manual: true,
            onSuccess(result){
                const {username,nickname}= result;
                // 存储到redux store
                dispatch(loginReducer({username,nickname}));
            },
            onFinally(){
                setWaitingUserData(false);
            }
        });
    // ajax加载完用户信息之后, 放在redux中, 不用返回
    const {username} = useGetUserInfo()
    useEffect(() => {
        if (username){
            setWaitingUserData(false) // 判断当前 redux store 已经存在用户信息,就不用重新加载
            return
        }
        run()
    }, []);
    return {waitingUserData}
}
export default useLoadUserData;