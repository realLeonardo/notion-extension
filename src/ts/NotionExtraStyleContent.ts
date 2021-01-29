import { utils } from "../utils";
import { NOTION_DISCUSSIONS_CONTAINER, NOTION_HELP_BTN_CLASSNAME } from "../const";

export type NotionExtraStyleConfig = {
  hideNotionHelpBtn: boolean;
  hideNotionPageDiscussions: boolean;
};

/**
 * 在这里设置额外的样式，例如：
 * 1. 隐藏右下角 Help
 * 2. 隐藏 comments
 */
class NotionExtraStyleConfigContent {
  private config: NotionExtraStyleConfig;

  public init(config: NotionExtraStyleConfig) {
    this.config = config;

    if (this.config.hideNotionHelpBtn) {
      this.hideNotionHelpBtn();
    }

    if (this.config.hideNotionPageDiscussions) {
      this.hideNotionPageDiscussions();
    }
  }

  public async hideNotionHelpBtn() {
    const helpBtnEL = await utils.asyncGetElement(NOTION_HELP_BTN_CLASSNAME);
    helpBtnEL.classList.add("nex-hidden");
  }

  public async hideNotionPageDiscussions() {
    const commentsViewEl = await utils.asyncGetElement(NOTION_DISCUSSIONS_CONTAINER);
    commentsViewEl.classList.add("nex-hidden");
    commentsViewEl.nextElementSibling.classList.add("nex-hidden");
  }
}

export const notionExtraStyleConfigContent = new NotionExtraStyleConfigContent();
