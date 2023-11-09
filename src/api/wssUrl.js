import request, {Method} from "@/utils/request";
import {converToUrl} from "@/utils/paramUtils";

export function getWssUrl (data) {
    return request({
        url: `/barrage/wssUrl`+converToUrl(data),
        method: Method.GET,
        needToken: true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
}







