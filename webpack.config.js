const path = require("path");
const ROOT_DIR = process.cwd();
module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    devtool:  "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: path.resolve(ROOT_DIR, "src"),
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(ROOT_DIR, "dist/"),
        filename: `bundle.js`,
    },
    devServer: {
        static: {
            directory: path.resolve(ROOT_DIR, "dist/"),
            watch: true,
        },
        port: process.env.PORT || 3003,
        open: {
            app: {
                name: "Google Chrome",
            },
        },
    },
}