import func from "./global_func";
const filters = {
    dateTime: (value, list) => {
        let arr = list ? list : ['h', 'm', 's']
        return func.changeDate(value) + " " + func.changeTime(value, arr)
    },
    messageTime: (value) => {
        let time = value * 1000;
        let newTime = new Date(func.changeDate(new Date().getTime()) + " 00:00:00");
        if (time >= newTime) {
            return func.changeTime(value, ['h', 'm']);
        } else if (time >= (newTime - (1000 * 60 * 60 * 24))) {
            return '昨天'
        } else if (time >= (newTime - (1000 * 60 * 60 * 24 * 2))) {
            return '前天'
        } else {
            return func.changeDate(value)
        }

    }
}
export default filters