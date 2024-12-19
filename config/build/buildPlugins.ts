import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
}: BuildOptions): webpack.WebpackPluginInstance[] => {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
      favicon: false,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ];
};
