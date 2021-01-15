import { utils } from "../utils";
import ScrollTopView from "../tsx/ScrollTopView";
import { NOTION_HELP_BTN_CLASSNAME } from "../const";

class ScrollTopContent {
  async init() {
    const targetEl = await utils.asyncGetElement(NOTION_HELP_BTN_CLASSNAME);
    const tempContainer = document.createElement("div");

    targetEl.before(tempContainer);
    ScrollTopView.renderTo(tempContainer);
  }
}

export const scrollTopContent = new ScrollTopContent();
