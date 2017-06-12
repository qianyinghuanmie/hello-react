/**
 * Created by fdd on 2017/6/9.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + "/app/main.jsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 在webpack的module部分的loaders里进行配置即可
                query:{
                    presets: ["react", "es2015"],
                    env: {
                        "development": {
                            "plugins": [["react-transform", {
                                "transforms": [{
                                    "transform": "react-transform-hmr",

                                    "imports": ["react"],

                                    "locals": ["module"]
                                }]
                            }]]
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader' // 添加对样式表的处理
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new ExtractTextPlugin("style.css")
    ],

    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        inline: true
    }
}