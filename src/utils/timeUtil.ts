/**
 * 日期格式化
 * @param timestamp 时间戳
 * @returns 返回格式化后日期
 */
export const formatDate = (timestamp: number): string => {
    if (!timestamp) {
        return '...';
    }

    let fixedDuration = 3 * 60 * 1000;
    let duration = new Date().getTime() - timestamp;
    if (duration < 60 * 1000) {
        return '刚刚'
    } else if (duration < fixedDuration) {
        return `${(duration / (60 * 1000)).toFixed()}分钟前`
    }
    let date = new Date(timestamp).toLocaleString('chinese', { hour12: false, dateStyle: 'short', timeStyle: 'short' });
    return date;
}

/**
 * 类似睡眠函数，使程序暂时停顿运行。配合async和await使用。
 * @param ms 毫秒数
 * @returns `then`返回毫秒数
 */
export const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
}

export default {
    sleep, formatDate
}