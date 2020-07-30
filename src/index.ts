import { Cacher } from "./cacher";
import { CacherConfig } from "./interfaces";
import { StorageAsyncDecorator } from "./async-decorator";

export function FrontendCacher(config: CacherConfig, key: string) {
  config.storage = new StorageAsyncDecorator(config.storage);
  return new Cacher(config, key);
}
