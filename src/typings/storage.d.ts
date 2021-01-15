interface StorageData {
  // 关闭回顶功能
  disableScrollTopBtn: boolean;
  // 隐藏帮助按钮
  hideNotionHelpBtn: boolean;
}

type StorageKey = keyof StorageData;
