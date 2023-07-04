export const formatFileSize = (b: number): string => {
    let str = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;
    for (let i = 0; i < str.length; i++) {
        if (b < 1024) {
            index = i;
            break;
        }
        b /= 1024;
    }
    return b.toFixed(2) + " " + str[index];
}