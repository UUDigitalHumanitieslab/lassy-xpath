// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
var webpackConfig = require('./webpack.conf');
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'es6-shim', 'karma-typescript'],
        files: ['src/**/*.ts'],
        preprocessors: {
            'src/**/*.ts': ['webpack']
        },
        mime: { 'text/x-typescript': ['ts', 'tsx'] },
        plugins: [
            require('karma-jasmine'),
            require('karma-es6-shim'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-typescript'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-webpack')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        webpack: {
            mode: 'development',
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            node: webpackConfig.node
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
