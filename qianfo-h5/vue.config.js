module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    productionSourceMap: false,
    /** 避免生成.map文件 */
    devServer: {
        port: 8008,
        disableHostCheck: true,
        proxy: {
            "/app": {
                target: process.env.VUE_APP_URL,
                ws: true,
                changeOrigin: true,
                // pathRewrite: {
                //     '/api': ''
                // }
            }
        }
    }
}