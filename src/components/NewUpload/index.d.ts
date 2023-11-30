/** 属性 */
export interface PropsInterface {
    /** 是否为图片上传模式 */
    isImg?: boolean;
    /** 图片上传模式下，是否需要裁剪 */
    isCropper?: boolean;
    /** 提示 */
    tip?: string;
    /** 是否隐藏已上传文件列表 */
    hiddenList?: boolean;
    /** 元素大小填充父元素，且隐藏上传文件列表和提示 */
    fillParent?: boolean;
    /** 按钮文字 */
    text?: string;
    /** 是否透明 */
    transparent?: boolean;
}