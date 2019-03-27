/* eslint-disable */
const ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin

const modifiedFileLoader = {
    exclude: [
        /\.html$/,
        /\.(js|jsx|mjs)$/,
        /\.(ts|tsx)$/,
        /\.(vue)$/,
        /\.(less)$/,
        /\.(re)$/,
        /\.(s?css|sass)$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.graphql$/
    ],
    loader: require.resolve("file-loader"),
    options: {
        name: "static/media/[name].[hash:8].[ext]",
        emitFile: true,
    },
}

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
    modify: (config, {target}) => {
        if(target === "web") {
            return {
                ...config,
                plugins: [
                    new ReactLoadablePlugin({
                        filename: "./build/react-loadable.json"
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
            }
        }

        return config
    }
}
