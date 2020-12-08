'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'test' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 1025 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/pc',
    outputDir: 'pc',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        disableHostCheck: true,
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        optimization: {
            chunkIds: 'natural'
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: '/src/',
                use: [{
                    loader: 'thread-loader',
                    options: {
                        workers: 3
                    }
                }]
            }]
        }
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [{
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial',
            }, ])
            // set alias for src
        config.resolve.alias.set('@', resolve('src'))
            // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')
        config.when(process.env.NODE_ENV !== 'development', (config) => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/,
                }, ])
                .end()
            config.optimization.splitChunks({
                    chunks: 'all',
                    minSize: 30000,
                    cacheGroups: {
                        vendors: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial', // only package third parties that are initially dependent
                        },
                        elementUI: {
                            name: 'chunk-elementUI', // split elementUI into a single package
                            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                        }
                    },
                })
                // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
            config.optimization.runtimeChunk('single')
                // config.plugin('progressBar').use(require('progress-bar-webpack-plugin')).end()
            config.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
        })
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/common.scss";`,
            },
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px", // 需要转换的单位，默认为"px"
                        viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
                        viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度
                        unitPrecision: 3, // 单位转换后保留的精度
                        propList: [ // 能转化为vw的属性列表
                            "*"
                        ],
                        viewportUnit: "vw", // 希望使用的视口单位
                        fontViewportUnit: "vw", // 字体使用的视口单位
                        selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
                        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                        replace: true, // 是否直接更换属性值，而不添加备用属性
                        //exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                    })
                ]
            }
        },
    },
}