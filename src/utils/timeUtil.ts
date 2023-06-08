/**
 * 日期格式化
 * @param timestamp 时间戳
 */
export const formatDate = (timestamp: number) => {
    if (!timestamp) {
        return '.';
    }

    let fixedDuration = 3 * 60 * 1000;
    let duration = new Date().getTime() - timestamp;
    if (duration < 60 * 1000) {
        return '刚刚'
    } else if (duration < fixedDuration) {
        return `${(duration / (60 * 1000)).toFixed()}分钟前`
    }
    let date = new Date(timestamp).toLocaleString('chinese', { hour12: false });
    return date;
}