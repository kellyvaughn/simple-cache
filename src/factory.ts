import { either } from "./utils";
import { Cacher } from "./cacher";
import { CacherConfig } from "./interfaces";
import { StorageAsyncDecorator } from "./async-decorator";

export const FrontendCacher = (config: CacherConfig) => {
  config.storage = new StorageAsyncDecorator(config.storage);
  new Cacher(config, either);
}
