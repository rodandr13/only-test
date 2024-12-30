import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: false,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      async: isDev,
      typescript: {
        configFile: paths.root,
      },
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return plugins;
};
