export namespace utils {
  // Equal document.querySelector
  export function queryElement(seletor: string): Element | null {
    return document.querySelector(seletor);
  }

  /**
   * @param queryElString Select the node that will be observed for mutations
   * @param config Options for the observer (which mutations to observe)
   */
  export async function elementObserver(queryElString: string, cb: Function, config?: MutationObserverInit) {
    const targetNode = await asyncGetElement(queryElString);
    let tmTemp: number;

    // Callback function to execute when mutations are observed
    const callback = (mutationsList: MutationRecord[], observer: MutationObserver) => {
      if (tmTemp) {
        clearTimeout(tmTemp);
      }
      tmTemp = setTimeout(() => {
        cb();
      }, 300);
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode as Node, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false,
    });
  }

  /**
   * 同步获取指定元素
   * @param selector 选择器, e.g.#root .icon section
   */
  export function asyncGetElement(selector: string): Promise<HTMLElement> {
    const targetEl = queryElement(selector);

    if (targetEl) {
      return Promise.resolve(targetEl as HTMLElement);
    }

    const forEachElement = <T extends Node>(list: NodeListOf<T>, handler: (item: T, idx: number) => void) => {
      for (let i = 0; i < list.length; i++) {
        const el = list[i];
        handler(el, i);
      }
    };

    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationRecords) => {
        for (const record of mutationRecords) {
          if (record.type !== "childList") {
            return;
          }
          const targetEl = record.target as HTMLElement;
          if ((targetEl && targetEl.matches && targetEl.matches(selector)) || (targetEl && targetEl.querySelector(selector))) {
            observer.disconnect();
            resolve(queryElement(selector) as HTMLElement);
            return;
          }
          forEachElement(record.addedNodes as any, (node) => {
            const el = node as HTMLElement;
            if (el && el.matches && el.matches(selector)) {
              observer.disconnect();
              resolve(queryElement(selector) as HTMLElement);
              return true;
            }
            return null;
          });
        }
      });

      observer.observe(document, { childList: true, subtree: true });
    });
  }
}
