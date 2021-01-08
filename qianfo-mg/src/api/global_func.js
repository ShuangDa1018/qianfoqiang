import md5 from 'md5';
const func = {
    ron: () => {
        return new Date().getTime();
    },
    sort_ASCII(obj) {
        var arr = new Array();
        var num = 0;
        for (let i in obj) {
            arr[num] = i;
            num++;
        }
        var sortArr = arr.sort();
        var sortObj = {};
        for (let i in sortArr) {
            sortObj[sortArr[i]] = obj[sortArr[i]];
        }
        return sortObj;
    },
    sign: arr => {
        arr = func.sort_ASCII(arr);
        let str = '';
        for (let key in arr) {
            if (arr[key] || arr[key] === 0) {
                str = str + key + '=' + arr[key] + '&';
            }
        }
        let sign = md5(str + 'appKey=1080c4f914b848ed70dc').toUpperCase();
        return sign;
    },
    /**
     * 判断一个数是否是个位，个位加0
     * @param {*} number
     */
    addZero(number) {
        return number < 10 ? '0' + number : number;
    },
    /**
     * 获取日期 返回年、月、日
     * @param {*} time 需要转化的日期
     */
    changeDate(time) {
        let date = time ? new Date(time) : new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + '-' + this.addZero(month) + '-' + this.addZero(day);
    },
    /**
     * @description:获取时间
     * @param {*} time 需要转换的时间
     * @param {array} arr 需要返回的信息的key.h:小时，m:分钟，s:秒
     */
    changeTime(time, arr) {
        let date = time ? new Date(time) : new Date();
        let dataHours = date.getHours();
        let dataMinute = date.getMinutes();
        let dataSecond = date.getSeconds();
        let info = {
            h: this.addZero(dataHours),
            m: this.addZero(dataMinute),
            s: this.addZero(dataSecond)
        };
        let str = '';
        arr.forEach((it, ix) => {
            str = str + info[it] + (ix < arr.length - 1 ? ':' : '');
        });
        return str;
    },
    /**
     * @description:获取白天或黑夜
     */
    getDay() {
        let time = this.changeDate();
        let start_time = new Date(time + ' 06:00:00').getTime();
        let end_time = new Date(time + ' 18:00:00').getTime();
        let current = new Date().getTime();
        if (current >= start_time && current <= end_time) {
            return true;
        }
        return false;
    },
    /**
     * 获取某年某月的日期
     */
    getMonthDay(month, year) {
        let length = 31;
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            length = 30
        } else if (month == 2) {
            if ((year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
                length = 29
            } else {
                length = 28
            }
        }
        return new Array(length).toString().split(',').map((it, ix) => {
            return ix + 1
        })
    },
    /**
     * 设置cookie
     * @param {*} name 名称
     * @param {*} data 值
     * @param {*} time 有效时间 默认一天
     */
    setCookie(name, data, time) {
        document.cookie =
            name + '=' + JSON.stringify(data) + ';expires=' + new Date(new Date().getTime() + (time ? time : 1) * (1000 * 60 * 60 * 24));
    },
    /**
     * 删除cookie
     * @param {*} name 名称
     */
    deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },
    /**
     * 获取cookie值
     * @param {*} name  名称
     */
    getCookie(name) {
        let allCookie = document.cookie.split(';');
        let current = '';
        allCookie.forEach(it => {
            if (it.indexOf(name) != -1) {
                current = it;
            }
        });
        return current ? JSON.parse(current.trim().substring(name.length + 1)) : '';
    },
    /**
     * 延迟调用
     * @param {*} cb 需要调用的函数
     * @param {*} time 延迟时间
     */
    delay(cb, time) {
        setTimeout(
            () => {
                cb && cb();
            },
            time ? time * 1000 : 2000
        );
    },

    /**
     * 返回项目名称
     */
    projectName() {
        return process.env.VUE_APP_PROJECTNAME;
    },
    /**
     * 返回文件大小，保留两位小数
     */
    computedFileSize(fileByte) {
        let byte = ""
        if (fileByte < 1024) {
            byte = 'B'
        } else if (fileByte < (Math.pow(1024, 2))) {
            fileByte = fileByte / 1024;
            byte = "KB"
        } else if (fileByte < (Math.pow(1024, 3))) {
            fileByte = fileByte / 1024 / 1024
            byte = "MB"
        } else if (fileByte < (Math.pow(1024, 4))) {
            fileByte = fileByte / 1024 / 1024 / 1024
            byte = "GB"
        }
        return fileByte.toFixed(2) + byte

    },
    /**
     * 判断是否是数组
     */
    isArray(arg) {
        if (!Array.isArray) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
        return Array.isArray(arg);
    },
    /**
     * 设置表单
     * info 数组
     */
    setAddInfo(info, key) {
        if (info && info.length) {
            localStorage.setItem('addForm_default_info_' + key, JSON.stringify(info[0]))
            this.setAddInfoList(key);
        }
        // else {
        //     localStorage.removeItem('addForm_default_info_' + key)
        //     this.removeAddInfoList(key)
        // }
    },
    /**
     * 设置保存了那些表单的内容
     */
    setAddInfoList(key) {
        let list = JSON.parse(localStorage.getItem('addForm_default_infoList'));
        if (!list) {
            list = []
        }
        let filter = list.filter(it => {
            return it == key
        })
        if (!filter || !filter.length) {
            list.push(key);
        }
        localStorage.setItem('addForm_default_infoList', JSON.stringify(list))
    },
    /**
     * 删除保存在表单中的内容
     */
    removeAddInfoList(key) {
        let list = JSON.parse(localStorage.getItem('addForm_default_infoList'));
        if (!list) {
            list = []
        }
        let index = '';
        list.forEach((it, ix) => {
            if (it == key) {
                index = ix;
            }
        })
        if (index || index === 0) {
            list.splice(index, 1);
        }
        localStorage.setItem('addForm_default_infoList', JSON.stringify(list))

    },
    /**
     * 移除所有的表单内容和保存数组
     */
    removeAll() {
        let list = JSON.parse(localStorage.getItem('addForm_default_infoList'))
        list.forEach(it => {
            localStorage.removeItem('addForm_default_info_' + it);
        })
        localStorage.removeItem('addForm_default_infoList')
    },
    /**
     * 获取表单值
     */
    getAddInfo(key) {
        let info = localStorage.getItem('addForm_default_info_' + key);
        if (info) {
            return JSON.parse(info)
        } else {
            return ''
        }
    }
};

export default func;