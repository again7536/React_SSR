const path = require('path');
const nodeExternals = require('webpack-node-externals');
//const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');

const getConfig = (isServer, dev) => ({
    entry: {
        [isServer?'server':'client']: isServer
            ?'./src/server.tsx'
            : dev
                    ?['webpack-hot-middleware/client', './src/client.tsx']
                    :'./src/client.tsx'
    },
    devtool:'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
        ]
    },
    plugins: isServer
        ? undefined
        : [new webpack.HotModuleReplacementPlugin()],
    externals: isServer? [nodeExternals()] : undefined
})

module.exports = (env, argv) => {
    if(argv.mode === 'development') {
        return [getConfig(true, true), getConfig(false, true)];
    }
    else if(argv.mode === 'production') {
        return [getConfig(true, false), getConfig(false, false)];
    }    
};