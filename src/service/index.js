import {rpRequest, axiosRequest} from "@/utils/request"
import {hideLoading, showLoading} from 'rpjssdk';
import {API} from "@/utils/api"

export default {
    /**
     * DEMO 示例
     * */
    medicalInfo: async (data) => {
        try {
            showLoading();
            let res = await rpRequest({
                url: API.medicalInfo,
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

