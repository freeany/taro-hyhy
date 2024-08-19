import Taro from '@tarojs/taro'
// 在使用 toast 方法时，可以传入参数，也可以不传入参数
// 如果需要传入参数，要传入对象作为参数

export const enum IconType {
  Success = 'success' ,
  Error = 'error' ,
  Loading = 'loading' ,
  None = 'none'
}
/**
 * @description 消息提示框
 * @param { Object } options 参数和 Taro.showToast 参数保持一致
 *
 * Taro.showToast 和    Taro.showLoading 同时只能显示一个
 * Taro.showToast 应与  Taro.hideToast 配对使用
 */
const toast = (
  title = "数据加载中...",
  icon = IconType.None,
  duration = 2000,
  mask = true,
) => {
  Taro.showToast({
    title,
    icon,
    duration,
    mask,
  });
};

/**
 * @description 模态对话框
 * @param { Object } options 参数和 Taro.showModal 参数保持一致
 */
const modal = (options = {}) => {
  return new Promise((resolve) => {
    const defaultOpt = {
      title: "提示",
      content: "您确定执行该操作吗？",
      confirmColor: "#f3514f",
    };

    const opts = Object.assign({}, defaultOpt, options);

    Taro.showModal({
      // 将合并以后的参数通过展开运算符赋值给 Taro.showModal 对象
      ...opts,
      success(res) {
          // 用户点击了确定按钮
        if (res.confirm) {
          resolve(true)
          // 用户点击了取消
        } else if (res.cancel) {
          resolve(false)
        }
      }
    });
  });
};

export { toast, modal };

export default {
  toast,
  modal
};
