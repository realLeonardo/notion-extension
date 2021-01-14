import ScrollTopView from "../tsx/ScrollTopView";
import { utils } from "../utils";

const NOTION_HELP_BTN_CLASSNAME = "div.notion-help-button";

export default class ScrollTopContent {
  static async init() {
    const targetEl = await utils.asyncGetElement(NOTION_HELP_BTN_CLASSNAME);
    const tempContainer = document.createElement("div");

    targetEl.before(tempContainer);
    ScrollTopView.renderTo(tempContainer);
  }
}
