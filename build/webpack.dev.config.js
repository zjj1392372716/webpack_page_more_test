const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
    devServer: {
        host: 'localhost', // 服务器的IP地址，可以使用IP也可以使用localhost
        compress: true, // 服务端压缩是否开启
        port: 3000, // 端口
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: path.resolve(__dirname, '../src/'),
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
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
                    {
                        loader: 'less-loader' // 如果less文件中使用了@import 引入了别的less文件，这里可以不用设置importLoaders
                    }
                ]
            }
        ] 
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) //暴露变量。判断当前环境是否为dev/build环境
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#cheap-module-eval-source-map'
})