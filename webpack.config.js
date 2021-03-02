const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === "development"? true : false;

module.exports = [{
    //Web
    entry: {
        client: ['webpack-hot-middleware/client','./src/client.tsx']
    },
    mode: devMode? 'development' : 'production',
    devtool:'inline-source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, `dist/public`),
        filename: '[name].js',
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ['babel-loader', 'ts-loader'],
            },
        ]
    },
    plugins: devMode? [
        new LoadablePlugin(), 
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NoEmitOnErrorsPlugin()
    ] : [
        new LoadablePlugin()
    ]
},
{
    //Rendering Server
    entry: {
        server: ['./src/server.tsx']
    },
    mode: devMode? 'development' : 'production',
    devtool:'inline-source-map',
    target: 'node',
    output: {
        path: path.resolve(__dirname, `dist/server`),
        filename: '[name].js',
        publicPath: '/server/',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: ['babel-loader', 'ts-loader'],
            },
        ]
    },
    externals: [nodeExternals()]
}]