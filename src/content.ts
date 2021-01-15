import "./less/global.less";
import { storage } from "./helpers/storage";
import {
  NotionExtraStyleConfig,
  notionExtraStyleConfigContent,
} from "./ts/NotionExtraStyleContent";
import { scrollTopContent } from "./ts/ScrollTopContent";

// init features config
storage.get(
  ["disableScrollTopBtn", "hideNotionHelpBtn"],
  ({ disableScrollTopBtn, hideNotionHelpBtn }) => {
    if (!disableScrollTopBtn) {
      scrollTopContent.init();
    }

    const styleConfig: NotionExtraStyleConfig = {
      hideNotionHelpBtn,
    };
    notionExtraStyleConfigContent.init(styleConfig);
  },
);
