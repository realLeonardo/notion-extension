import { utils } from "../utils";
import OutlineView from "../tsx/OutlineView";
import { NOTION_PAGE_SCROLLER_CONTAINER } from "../const";

class OutlineContent {
  private hasInited: boolean = false;
  private shadowContainer: HTMLElement;

  constructor() {
    this.shadowContainer = document.createElement("div");
    this.shadowContainer.className = "nex-outline-wrapper";
  }

  async init(disableOutline: boolean) {
    if (!this.hasInited) {
      const targetEl = await utils.asyncGetElement(NOTION_PAGE_SCROLLER_CONTAINER);

      targetEl.before(this.shadowContainer);
      OutlineView.renderTo(this.shadowContainer);
      this.hasInited = true;
    }

    if (disableOutline) {
      this.shadowContainer.classList.add("nex-hidden");
    } else {
      this.shadowContainer.classList.remove("nex-hidden");
    }
  }
}

export const outlineContent = new OutlineContent();
