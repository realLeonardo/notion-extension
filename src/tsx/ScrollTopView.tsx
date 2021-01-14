import "../less/scroll-top-view.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { utils } from "../utils";

export default class ScrollTopView extends React.Component {
  public render() {
    return (
      <div className="scroll-top-btn" onClick={this.handleScrollTopBtnClick}>
        👆
      </div>
    );
  }

  protected handleScrollTopBtnClick() {
    const notionEditorContainer = utils.querySelector(
      "div.notion-frame > div.notion-scroller"
    );

    if (!notionEditorContainer) {
      console.error("cannot find .notion-frame > .notion-scroller");
      return;
    }

    notionEditorContainer.scroll({
      top: 0,
      left: 0,
    });
  }

  static renderTo(el: HTMLElement): void {
    ReactDOM.render(<ScrollTopView />, el);
  }
}
