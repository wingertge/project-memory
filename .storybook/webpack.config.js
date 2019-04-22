// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require("path")

module.exports = {
    plugins: [
        // your custom plugins
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [/stories/, /src/],
                exclude: [/node_modules/],
                use: [{
                    loader: require.resolve("ts-loader")
                }, {
                    loader: require.resolve("react-docgen-typescript-loader")
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|jpe?g|png)$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve("file-loader"),
                    options: {
                        name: "static/[name]-[hash:8].[ext]",
                        emitFile: true
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve("./"),
            "node_modules"
        ],
        extensions: [".js", ".jxs", ".ts", ".tsx"]
    }
}
