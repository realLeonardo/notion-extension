class Storage {
  public bindData<K extends StorageKey>(
    keys: K[],
    handler: (data: Pick<StorageData, K>) => void,
  ): void {
    // 使用此方法可以避免写两个一样的handler，一个用于get，一个用于listen
    // 但是此方法也是有局限性的，只要监听的字段中有一个变动，都会触发onchange，且数据不会是undefined
    let cachedValues: Pick<StorageData, K> = {} as any;
    this.get(keys, (data) => {
      for (let k of keys) {
        cachedValues[k] = data[k];
      }
      handler(data);
    });
    this.listen(keys, (data) => {
      for (let k of keys) {
        if (data[k] === undefined) {
          if (cachedValues[k] !== undefined) {
            data[k] = cachedValues[k];
          }
        } else {
          cachedValues[k] = data[k];
        }
      }
      handler(data);
    });
  }

  public listen<K extends StorageKey>(
    keys: K[],
    handler: (data: Pick<StorageData, K>) => void,
  ): void {
    chrome.storage.onChanged.addListener(function (changedData) {
      let res: Pick<StorageData, K> = {} as any;
      for (let k of keys) {
        if (changedData[k] !== undefined && changedData !== null) {
          if (changedData[k].newValue === undefined) {
            // 数据中不允许新值是undefined，一律转换成null
            res[k] = null;
          } else {
            res[k] = JSON.parse(changedData[k].newValue);
          }
        }
      }
      if (Object.keys(res).length > 0) {
        handler(res);
      }
    });
  }

  public set(data: Partial<StorageData>, callback?: () => void): void {
    let stringified: { [k in StorageKey]?: string } = {};
    let k: StorageKey;
    for (k in data) {
      let v = data[k];
      stringified[k] = JSON.stringify(v);
    }
    chrome.storage.local.set(stringified, callback);
  }

  public get<K extends StorageKey>(
    keys: K[],
    callback: (data: Pick<StorageData, K>) => void,
  ): void {
    chrome.storage.local.get(keys, function (data) {
      let res: Pick<StorageData, K> = {} as any;
      for (let k of keys) {
        if (data[k] === undefined) {
          // TODO 是否需要对undefined做处理?
          res[k] = undefined;
        } else {
          res[k] = JSON.parse(data[k]);
        }
      }
      callback(res);
    });
  }
}

export const storage = new Storage();
