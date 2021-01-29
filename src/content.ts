import "./less/global.less";
import { storage } from "./helpers/storage";
import { NotionExtraStyleConfig, notionExtraStyleConfigContent } from "./ts/NotionExtraStyleContent";
import { scrollTopContent } from "./ts/ScrollTopContent";
import { outlineContent } from "./ts/OutlineContent";

console.log("Here is content");

// init features config
storage.get(
  ["disableScrollTopBtn", "hideNotionHelpBtn", "disableOutline", "hideNotionPageDiscussions"],
  ({ disableScrollTopBtn, hideNotionHelpBtn, disableOutline, hideNotionPageDiscussions }) => {
    if (!disableScrollTopBtn) {
      scrollTopContent.init();
    }

    if (!disableOutline) {
      outlineContent.init();
    }

    const styleConfig: NotionExtraStyleConfig = {
      hideNotionHelpBtn,
      hideNotionPageDiscussions,
    };
    notionExtraStyleConfigContent.init(styleConfig);
  }
);
