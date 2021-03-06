import {request, toast, hideLoading} from 'rpjssdk';
import axios from 'axios';

axios.defaults.crossDomain = true

/**
 * @author <dutianhe@ruubypay.com>
 * @date 2020/09/27
 * @description  rpjssdk 数据请求封装 适配app
 * @param
 * @return Promise
 */
export const rpRequest = params => {
    try {
        return request({
            url: params.url,
            method: params.method || 'post', //支持 GET POST
            tokenType: 2, // 0不添加公共参数, 1默认密钥计算mac, 2用户密钥计算mac
            arguments: {
                ...params.data
            },
        }).then(res => {
            console.log("请求url========", params.url);
            let {resData, resCode, resMessage} = res = typeof res === 'string' ? JSON.parse(res) : res;
            if (resCode === "0000" || resCode === "00000000") {
                return Promise.resolve(resData);
            } else {
                if (!params.noToast) ToastFail(resMessage);
                return Promise.reject(res);
            }
        })
    } catch (e) {
        ToastFail(e.message);
        return Promise.reject();
    }

}


/**
 * @author <dutianhe@ruubypay.com>
 * @date 2020/09/27
 * @description axios 数据请求封装 适配 h5
 * @param
 * @return Promise
 */
export const axiosRequest = params => {
    try {
        return axios({
            method: params.method || 'post',
            url: params.url,
            data: {
                ...params.data
            }
        }).then(res => {
            console.log("请求url========", params.url);
            console.log("返回数据========", res);
            let {resData, resCode, resMessage} = res.data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            if (resCode == '0000') {
                return Promise.resolve(resData);
            } else {
                if (!params.noToast) ToastFail(resMessage,true);
                return Promise.reject(resData);
            }
        }).catch(err => {
            return Promise.reject(err);
        })
    } catch (e) {
        ToastFail(e.message,true);
        return Promise.reject(e);
    }
}

function ToastFail(msg,isH5) {
    msg = msg || '服务异常'
    if (isH5) {
        alert(msg)
    } else {
        hideLoading();
        toast({
            content: msg
        })
    }
    console.error(msg)
    return;
}
