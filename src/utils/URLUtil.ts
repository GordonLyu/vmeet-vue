import router from "@/router";
import type { RouteRecord } from "vue-router";

export const toUTF8 = (str: string) => {
    return decodeURIComponent(str);
}

export const toObj = () => {

}

/**
 * 获取指定的某个路由
 * @param path 路径
 * @returns 返回 `RouteRecord` 类型的路由，不存在路由时返回 `null`
 */
export const getRouter = (path: string): RouteRecord | null => {
    let routerTemp: RouteRecord = router.getRoutes()[0];
    let isExist = false
    for (const item of router.getRoutes()) {
        if (item.path == path) {
            isExist = true;
            routerTemp = item;
            break;
        }
    }
    if (!isExist) {
        return null
    }
    return routerTemp;
}