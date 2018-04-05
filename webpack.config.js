module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './client/index.js',
    output: {
        filename: './javascripts/bundle.js',
        sourceMapFilename: './javascripts/bundle.js.map'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            }, {
                test: /\.sass$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader?-url" }, { loader: "sass-loader" }]
            }]
    }
};