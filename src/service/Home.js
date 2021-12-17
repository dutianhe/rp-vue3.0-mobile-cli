import {rpRequest, axiosRequest} from "@/utils/request"
import {hideLoading, showLoading} from 'rpjssdk';
import {API} from "@/utils/api"

export default {
    /**
     * DEMO 示例
     * */
    demoRequest: async (data) => {
        try {
            showLoading();
            let res = await axiosRequest({
                url: API.demoAPI,
                data: {
                    ...data
                },
            });
            hideLoading();
            return res;
        } catch (e) {
            hideLoading();
            console.log(e)
            return {};
        }
    },

    /**
     * DEMO rpjssdk 示例
     * */
    demoRPRequest: async (data) => {
        try {
            showLoading();
            let res = await rpRequest({
                url: API.demoAPI,
                data: {
                    ...data
                },
            });
            hideLoading();
            return res;
        } catch (e) {
            hideLoading();
            console.log(e)
            return {};
        }
    },


}

