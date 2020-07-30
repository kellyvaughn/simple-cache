import { Cacher } from "./cacher";
import { CacherConfig } from "./interfaces";
import { StorageAsyncDecorator } from "./async-decorator";

export const Cache = (config: CacherConfig, key: string) => {
  config.storage = new StorageAsyncDecorator(config.storage);
  return new Cacher(config, key);
}
