import type { Configuration as DevSeverConfiguration } from "webpack-dev-server";

import { BuildOptions } from "./types/config";

export const buildDevServer = (
  options: BuildOptions
): DevSeverConfiguration => {
  return {
    port: options.port,
    open: true,
  };
};
