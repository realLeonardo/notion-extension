export namespace utils {
  // Just for test
  export function test() {
    console.log("test");
  }

  // == document.querySelector
  export function querySelector(seletor: string): Element | null {
    return document.querySelector(seletor);
  }

  /**
   * Observer
   * @param queryElString Select the node that will be observed for mutations
   * @param config Options for the observer (which mutations to observe)
   */
  export function ElementObserver(
    queryElString: string,
    config: MutationObserverInit,
  ) {
    const targetNode = document.querySelector(queryElString);

    // Callback function to execute when mutations are observed
    const callback = (
      mutationsList: MutationRecord[],
      observer: MutationObserver,
    ) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          console.log(
            "The " + mutation.attributeName + " attribute was modified.",
          );
        }
      }

      // Later, you can stop observing
      observer.disconnect();
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode as Node, config);
  }

  /** 
   * 同步获取指定元素
   * @param selector 选择器, e.g.#root .icon section
   */
  export function asyncGetElement(
    selector: string,
  ): Promise<HTMLElement> {
    let queryElement = (selector: string): HTMLElement => {
      return document.querySelector(selector) as HTMLElement;
    };
    let targetEl: HTMLElement = queryElement(selector);
    if (targetEl) {
      return Promise.resolve(targetEl);
    }
    return new Promise((resolve) => {
      const observer = new MutationObserver((mutationRecords) => {
        for (let rec of mutationRecords) {
          if (rec.type !== "childList") return;
          let targetEl = rec.target as HTMLElement;
          if (
            (targetEl && targetEl.matches && targetEl.matches(selector)) ||
            (targetEl && targetEl.querySelector(selector))
          ) {
            observer.disconnect();
            resolve(queryElement(selector));
            return;
          }
          forEachElement(rec.addedNodes as any, (node) => {
            let el = node as HTMLElement;
            if (el && el.matches && el.matches(selector)) {
              observer.disconnect();
              resolve(queryElement(selector));
              return true;
            }
            return null;
          });
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    });
  }

  export function forEachElement<T extends Node>(
    list: NodeListOf<T>,
    handler: (item: T, idx: number) => void,
  ) {
    for (let arr = list, i = 0; i < arr.length; i++) {
      let el = arr[i];
      handler(el, i);
    }
  }
}
