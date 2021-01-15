import { NOTION_HELP_BTN_CLASSNAME } from "../const";
import { utils } from "../utils";

export type NotionExtraStyleConfig = {
  hideNotionHelpBtn: boolean;
};

class NotionExtraStyleConfigContent {
  private config: NotionExtraStyleConfig;

  public init(config: NotionExtraStyleConfig) {
    this.config = config;

    if (this.config.hideNotionHelpBtn) {
      this.hideNotionHelpBtn();
    }
  }

  public async hideNotionHelpBtn() {
    const helpBtnEL = await utils.asyncGetElement(NOTION_HELP_BTN_CLASSNAME);
    helpBtnEL.classList.add("nex-hidden");
  }
}

export const notionExtraStyleConfigContent =
  new NotionExtraStyleConfigContent();
