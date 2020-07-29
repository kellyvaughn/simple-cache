import { either } from "./utils";
import { Cacher } from "./cacher";
import { CacherConfig } from "./interfaces";
import { StorageAsyncDecorator } from "./async-decorator";

export const FrontendCacher = (config: CacherConfig, key: string) => {
  config.storage = new StorageAsyncDecorator(config.storage);
  const cacher = new Cacher(config, key);
}
