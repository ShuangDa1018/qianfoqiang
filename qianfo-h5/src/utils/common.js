const common = {
    /**
     * 转换成文件
     * @param {*} dataUrl 
     * @param {*} fileName 
     */
    toFile(dataUrl, fileName) {
        var arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {
            type: mime
        });
    },
}
export default common