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

const reactLoadablePlugin = new ReactLoadablePlugin({
    filename: "./build/react-loadable.json"
})

module.exports = {
    plugins: ["typescript"],
    modify: config => {
        config.module.rules = config.module.rules.filter(rule => rule.loader !== modifiedFileLoader.loader)

        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader"
        }, modifiedFileLoader)

        //config.plugins.push(reactLoadablePlugin)

        return config
    }
}
