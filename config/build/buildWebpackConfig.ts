import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import webpack from "webpack";

import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";

export const buildWebpackConfig = (
  options: BuildOptions
): webpack.Configuration => {
  const { mode, paths, isDev } = options;

  return {
    mode: mode,
    target: "web",
    entry: paths.entry,
    output: {
      filename: "js/[name].[contenthash].js",
      path: paths.build,
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    optimization: {
      minimize: true,
      usedExports: true,
      moduleIds: "deterministic",
      concatenateModules: true,
      minimizer: ["...", new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module: webpack.NormalModule): string {
              if (module.context === null) {
                return "unknown";
              }

              const match = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );

              if (match && match[1]) {
                const packageName = match[1].replace("@", "");
                return `npm.${packageName}`;
              }
              return "unknown";
            },
          },
        },
      },
    },
    plugins: buildPlugins(options),
    devServer: isDev ? buildDevServer(options) : undefined,
    devtool: isDev ? "inline-source-map" : undefined,
  };
};
