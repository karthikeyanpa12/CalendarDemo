const path = require("path");
const DIR_BUILD = path.resolve(__dirname, 'dist');
const SOURCES = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', "./src/index.js"],
    mode: "development",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', 'jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                include: [SOURCES]
            },
            {
                test: /.(css|scss|styl)$/,
                include: [SOURCES],
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            preferPathResolver: 'webpack'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src", "index.html")
        })
    ],
    devServer: {
        hot: true,
        inline: true,
        port: 9000,
        historyApiFallback: true,
    },
    devtool: 'source-map'
};