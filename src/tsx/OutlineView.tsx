import "../less/outline-view.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { utils } from "../utils";
import { NOTION_FRAME_CONTAINER, NOTION_PAGE_CONTENT_CONTAINER } from "../const";

const NOTION_HEADER = NOTION_PAGE_CONTENT_CONTAINER + " .notion-header-block";
const NOTION_SUB_HEADER = NOTION_PAGE_CONTENT_CONTAINER + " .notion-sub_header-block";
const NOTION_SUB_SUB_HEADER = NOTION_PAGE_CONTENT_CONTAINER + " .notion-sub_sub_header-block";

type HeaderNode = {
  blockId: string;
  text: string;
  // 1, 2, 3 -> h1, h2, h3
  level: number;
};

type State = {
  isLoading: boolean;
  headerNodes: HeaderNode[];
};

export default class OutlineView extends React.Component {
  public state: State = {
    headerNodes: [],
    isLoading: false,
  };
  private notionFrameEl: HTMLElement;
  private outlineWrapper: HTMLElement;

  public render() {
    return (
      <div className={"nex-outline-container"}>
        <p className="outline-title">OUTLINE</p>
        {this.state.headerNodes.map((headerNode) => (
          <p
            className={"header-text header-text-" + headerNode.level}
            onClick={this.handleHeaderNodeClick.bind(this, headerNode.blockId)}
            key={headerNode.blockId}
          >
            {headerNode.text}
          </p>
        ))}
      </div>
    );
  }

  public async componentDidMount() {
    this.notionFrameEl = await utils.asyncGetElement(NOTION_FRAME_CONTAINER);
    this.outlineWrapper = await utils.asyncGetElement(".nex-outline-wrapper");

    this.initOutline();
    this.initWindowResizeListeners();
  }

  private initOutline() {
    this.updateOutline();

    utils.elementObserver(NOTION_FRAME_CONTAINER, async () => {
      this.updateScrollerWidth();
      this.updateOutline();
    });
  }

  private initWindowResizeListeners() {
    window.addEventListener("resize", () => {
      this.updateScrollerWidth();
    });

    this.updateScrollerWidth();
  }

  private updateOutline() {
    console.log("shouldShowOutlineView: ", this.shouldShowOutlineView());
    const titleElements = Array.from(document.querySelectorAll(`${NOTION_HEADER}, ${NOTION_SUB_HEADER}, ${NOTION_SUB_SUB_HEADER}`));
    const headerNodes: HeaderNode[] = [];

    for (const t of titleElements) {
      const el = t as HTMLElement;
      let level = 1;

      if (el.classList.contains("notion-sub_header-block")) {
        level = 2;
      } else if (el.classList.contains("notion-sub_sub_header-block")) {
        level = 3;
      }

      headerNodes.push({
        blockId: el.dataset.blockId.split("-").join(""),
        text: el.innerText,
        level,
      });
    }

    this.setState({
      headerNodes,
    });
  }

  private updateScrollerWidth() {
    try {
      const scroller = this.notionFrameEl.querySelector("div.notion-scroller") as HTMLElement;

      scroller.style.width = this.notionFrameEl.clientWidth - this.outlineWrapper.clientWidth + "px";
    } catch (error) {
      // do nth
    }
  }

  private handleHeaderNodeClick(blockId: string) {
    location.hash = "";
    location.hash = blockId;
  }

  private shouldShowOutlineView(): boolean {
    if (this.notionFrameEl.querySelector(".notion-page-content")) {
      return true;
    } else {
      return false;
    }
  }

  static renderTo(targetEl: HTMLElement): void {
    ReactDOM.render(<OutlineView />, targetEl);
  }
}
