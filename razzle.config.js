/* eslint-disable */
const path = require("path")
const LoadablePlugin = require("@loadable/webpack-plugin")
const LoadableBabelPlugin = require('@loadable/babel-plugin')
const babelPresetRazzle = require('razzle/babel')

module.exports = {
    plugins: [{
        name: "typescript",
        options: {
            useBabel: true,
            useEslint: false,
            tsLoader: {
                transpileOnly: true,
                experimentalWatchApi: true
            }
        }
    }],
    modify: (config, {dev, target}) => {
        const appConfig = {...config}

        if(target === "web") {
            const filename = path.resolve(__dirname, 'build')

            appConfig.node = {
                fs: "empty"
            }

            appConfig.plugins = [
                ...appConfig.plugins,
                new LoadablePlugin({
                    outputAsset: false,
                    writeToDisk: {filename}
                })
            ]

            appConfig.output.filename = "static/js/[name].js"
            appConfig.optimization = {
                ...appConfig.optimization,
                runtimeChunk: true,
                splitChunks: {
                    chunks: "all",
                    name: dev
                }
            }
/*            return {
                ...config,
                node: {
                    fs: 'empty'
                },
                plugins: [
                    new ReactLoadablePlugin({
                        filename: "./build/react-loadable.json"
                    }),
                    new LoadablePlugin({
                        outputAsset: false,
                        writeToDisk: {filename}
                    }),
                    ...config.plugins
                ],
                module: {
                    ...config.module,
                    rules: [
                        ...config.module.rules.filter(rule => rule.loader !== modifiedFileLoader.loader),
                        {
                            test: /\.(graphql|gql)$/,
                            exclude: /node_modules/,
                            loader: "graphql-tag/loader"
                        },
                        modifiedFileLoader
                    ]
                }
            }*/
        }

        return appConfig
    },
    modifyBabelOptions: () => ({
        babelrc: false,
        presets: [babelPresetRazzle],
        plugins: [LoadableBabelPlugin]
    })
}
