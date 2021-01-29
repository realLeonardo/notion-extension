interface StorageData {
  // 关闭回顶功能：所有功能均默认开始
  disableScrollTopBtn: boolean;
  // 隐藏帮助按钮
  hideNotionHelpBtn: boolean;
  // 关闭大纲功能
  disableOutline: boolean;
  // 隐藏页面评论框
  hideNotionPageDiscussions: boolean;
}

type StorageKey = keyof StorageData;
