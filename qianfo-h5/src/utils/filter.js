const filter = {
    /**
     * 验证电话
     */
    checkPhone(val) {
        let reg = new RegExp(/^1[3456789]\d{9}$/g);
        return reg.test(val)
    },
    /**
     * 验证密码
     */
    checkPassword(val) {
        let reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
        return reg.test(val)
    }
}
export default filter