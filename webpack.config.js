const path = require('path');

module.exports = {
    entry: {
        app:'./src/index.ts',
        server: './src/server.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            }
        ]
    }
}