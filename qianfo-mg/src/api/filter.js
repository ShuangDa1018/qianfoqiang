

const filter = {
    /**
     * 验证正数
     */
    checkPlus(val){
        let reg = new RegExp(/^[1-9]{1}[0-9]*(\.\d*)?$/)
        return reg.test(val);
    },
    /**
     * 验证正整数
     */
    checkPositiveInteger(val){
        let reg = new RegExp(/^[1-9]{1}[0-9]*$/)
        return reg.test(val);
    },
    /**
     * 验证小数位数,默认验证2位,没有小数位数返回true
     */
    checkPlaces(val,number){
        let str = String(val);
        return  str.indexOf('.')>-1?String(val).split('.')[1].length<=number:true;
    },
    /**
     * 验证电话
     */
    checkPhone(val){
        let reg = new RegExp(/^1[3456789]\d{9}$/g);
        return reg.test(val)
    },
    /**
     * 验证身份证
     */
    checkIdCard(val){
        let reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
        return reg.test(val)
    },
    /**
     * 验证车牌
     */
    checkPlate(val){
        let reg = new RegExp(/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/);
        return reg.test(val);
    },
    /**
     * 验证中文姓名
     */
    checkName(val){
        let reg = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);
        return reg.test(val)
    }
}
export default filter