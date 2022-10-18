// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV == "production";
const isDev = process.env.NODE_ENV == "development";

const pages = ["home"];

const config = {
  context: path.resolve(__dirname, "src"),

  entry: pages.reduce((config, page) => {
    config[page] = [`./pages/${page}/${page}.js`]; // "@babel/polyfill"
    return config;
  }, {}),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name].[ext]",
  },
  devtool: isDev ? "source-map" : false,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    port: 8080,
    open: true,
    host: "localhost",
    compress: true,
    hot: isDev,
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./pages/${page}/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
          minify: {
            collapseWhitespace: isProd,
          },
        })
    ),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ),

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|jpg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]",
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "png", "svg", "jpeg", "ttf"],
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
};

module.exports = () => {
  if (isProd) {
    config.mode = "production";
  } else {
    config.mode = "development";
    // config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
