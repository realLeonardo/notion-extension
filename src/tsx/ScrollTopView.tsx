import "../less/scroll-top-view.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { utils } from "../utils";

const NOTION_EDITOR_CONTAINER = "div.notion-frame > div.notion-scroller";

export default class ScrollTopView extends React.Component {
  public render() {
    return (
      <div
        className="nex-scroll-top-btn"
        onClick={this.handleScrollTopBtnClick}
      >
        👆
      </div>
    );
  }

  public componentDidMount() {
    // todo
  }

  protected handleScrollTopBtnClick() {
    const notionEditorContainer = utils.queryElement(NOTION_EDITOR_CONTAINER);

    if (!notionEditorContainer) {
      console.error("cannot find ${NOTION_EDITOR_CONTAINER}");
      return;
    }

    // Scroll to top
    notionEditorContainer.scroll({
      top: 0,
      left: 0,
    });
  }

  static renderTo(targetEl: HTMLElement): void {
    ReactDOM.render(<ScrollTopView />, targetEl);
  }
}
