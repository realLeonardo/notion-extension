import ScrollTopView from "../tsx/ScrollTopView";
import { utils } from "../utils";

export default class ScrollTopContent {
  static depElSeletor: string = "div.notion-help-button";

  static async init() {
    const el = await utils.asyncGetElement(this.depElSeletor);
    console.log(el);

    const shadowContainer = document.createElement("div");
    el.before(shadowContainer);
    console.log(Array.from(el.parentNode!.children).indexOf(el));
    ScrollTopView.renderTo(shadowContainer);
  }
}
