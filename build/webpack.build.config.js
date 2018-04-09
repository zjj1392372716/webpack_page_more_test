const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css
const CleanPlugin = require('clean-webpack-plugin') //webpack插件，用于清除目录文件
const Uglify = require('uglifyjs-webpack-plugin'); // 压缩js代码
var buildConfig = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js',
        publicPath: ''
    }, 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-cssnext')(),
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    } 
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('postcss-cssnext')(),
                                require('autoprefixer')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({          
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //暴露全局变量。判断当前环境是否为dev/build环境
        }),
        new MiniCssExtractPlugin({ // 分离 css
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.LoaderOptionsPlugin({ // 压缩css
            minimize: true
        }),
        new CleanPlugin(['dist'], { // 清除dist
            root: path.join(__dirname, '../')
        })
    ],
    devtool: false
}
buildConfig.plugins.push(new Uglify()) // js压缩代码
module.exports = merge(baseWebpackConfig, buildConfig)
