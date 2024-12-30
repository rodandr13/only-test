import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import { BuildOptions } from "./types/config";

export const buildLoaders = ({
  isDev,
}: BuildOptions): webpack.RuleSetRule[] => {
  const swcLoader: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "swc-loader",
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: "automatic",
              development: isDev,
              refresh: isDev,
            },
          },
          target: "es2015",
        },
      },
    },
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
          esModule: false,
        },
      },
      "sass-loader",
    ],
  };

  const fontsLoader = {
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: "asset/resource",
    generator: {
      filename: "fonts/[name][ext]",
    },
  };

  const imagesLoader = {
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset/resource",
    generator: {
      filename: "images/[name][hash][ext]",
    },
  };
  return [swcLoader, cssLoader, scssLoader, fontsLoader, imagesLoader];
};
