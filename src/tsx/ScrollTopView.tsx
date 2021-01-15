import "../less/scroll-top-view.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { storage } from "../helpers/storage";
import { utils } from "../utils";
import { NOTION_EDITOR_CONTAINER } from "../const";

export default class ScrollTopView extends React.Component {
  private notionEditorContainer: HTMLElement;

  public render() {
    return (
      <div
        className="nex-scroll-top-btn"
        onClick={this.handleScrollTopBtnClick.bind(this)}
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
      this.test();
    } catch (error) {
      console.error("Cannot find HTMLElement: NotionEditorContainer");
    }
  }

  private test() {
    storage.set({ hideNotionHelpBtn: true });
  }

  static renderTo(targetEl: HTMLElement): void {
    ReactDOM.render(<ScrollTopView />, targetEl);
  }
}
