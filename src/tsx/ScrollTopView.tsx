import "../less/scroll-top-view.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { utils } from "../utils";

const NOTION_EDITOR_CONTAINER = "div.notion-frame > div.notion-scroller";

export default class ScrollTopView extends React.Component {
  private notionEditorContainer: HTMLElement;

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
    try {
      if (!this.notionEditorContainer) {
        this.notionEditorContainer = utils.queryElement(
          NOTION_EDITOR_CONTAINER
        ) as HTMLElement;
      }

      this.notionEditorContainer.scroll({
        top: 0,
        left: 0,
      });
    } catch (error) {
      console.error("Cannot find HTMLElement: NotionEditorContainer");
    }
  }

  static renderTo(targetEl: HTMLElement): void {
    ReactDOM.render(<ScrollTopView />, targetEl);
  }
}
