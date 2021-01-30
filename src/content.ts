import "./less/global.less";
import "./less/extra-style.less";
import { storage } from "./helpers/storage";
import { notionExtraStyleConfigContent } from "./ts/NotionExtraStyleContent";
import { scrollTopContent } from "./ts/ScrollTopContent";
import { outlineContent } from "./ts/OutlineContent";

function initContent() {
  // init features config
  storage.get(
    ["disableScrollTopBtn", "hideNotionHelpBtn", "disableOutline", "hideNotionPageDiscussions"],
    ({ disableScrollTopBtn, hideNotionHelpBtn, disableOutline, hideNotionPageDiscussions }) => {
      scrollTopContent.init(disableScrollTopBtn);
      outlineContent.init(disableOutline);

      const styleConfig = {
        hideNotionHelpBtn,
        hideNotionPageDiscussions,
      };
      notionExtraStyleConfigContent.init(styleConfig);
    }
  );
}

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    initContent();
  }
});

// NOTE: 监听url变化。暂时不用
// let pathnameTemp = location.pathname;
// document.body.addEventListener("click", () => {
//   setTimeout(() => {
//     if (location.pathname !== pathnameTemp) {
//       pathnameTemp = location.pathname;
//       initContent();
//     }
//   }, 0);
// });
