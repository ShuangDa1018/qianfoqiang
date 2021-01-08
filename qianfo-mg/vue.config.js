module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
    },

    devServer: {
        port: 8001,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        proxy: {
            '/manage/*': {
                target: process.env.VUE_APP_URL,
                secure: false,
                changeOrigin: true
            },
            '/images/': {
                target: process.env.VUE_APP_URL,
                secure: false,
                changeOrigin: true
            },
            '/general/*': {
                target: process.env.VUE_APP_URL,
                secure: false,
                changeOrigin: true
            },
            '/templateExcel/*': {
                target: process.env.VUE_APP_URL,
                secure: false,
                changeOrigin: true
            }
        }
    }
};
