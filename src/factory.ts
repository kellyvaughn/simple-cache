import { Cacher } from "./cacher";
import { CacherConfig } from "./interfaces";
import { StorageAsyncDecorator } from "./async-decorator";

export const getCache = (config: CacherConfig) => {
  config.storage = new StorageAsyncDecorator(config.storage);
  return new Cacher(config);
}
