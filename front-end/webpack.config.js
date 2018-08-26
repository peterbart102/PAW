const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js"],
        modules: ["./sources", "node_modules"],
        alias: {
            "jet-views": path.resolve(__dirname, "src/views"),
            "jet-locales": path.resolve(__dirname, "src/locales")
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};