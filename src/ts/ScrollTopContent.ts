import { utils } from "../utils";
import ScrollTopView from "../tsx/ScrollTopView";
import { NOTION_HELP_BTN_CLASSNAME } from "../const";

class ScrollTopContent {
  private hasInited: boolean = false;
  private shadowContainer: HTMLElement;

  constructor() {
    this.shadowContainer = document.createElement("div");
  }

  async init(disableScrollTop: boolean) {
    if (!this.hasInited) {
      const targetEl = await utils.asyncGetElement(NOTION_HELP_BTN_CLASSNAME);

      targetEl.before(this.shadowContainer);
      ScrollTopView.renderTo(this.shadowContainer);
      this.hasInited = true;
    }

    if (disableScrollTop) {
      this.shadowContainer.classList.add("nex-hidden");
    } else {
      this.shadowContainer.classList.remove("nex-hidden");
    }
  }
}

export const scrollTopContent = new ScrollTopContent();
