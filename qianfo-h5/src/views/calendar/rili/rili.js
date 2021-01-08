/*
cldID:"Huangli",		日历表格的ID
prevYear:"#prevYear",	上一年按扭
nextYear:"#nextYear",	下一年按扭
prevMonth:"#prevMonth",	上个月按扭
nextMonth:"#nextMonth",	下个月按扭
goToDay:"#goToDay",		回到今日按扭
showGongli:"#sGongli",	显示公历
showNongli:"#sNongli",	显示农历
activeType:"click",		触发当日事件
dayCallBack:{}			返回当日内容：[日,公历日期,星期,星座,生肖,农历日期,天干地支,宜忌,节日,彭祖百忌]
*/
var lunarInfo = new Array(
    0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af, 0x9ad0, 0x55d2,
    0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd255, 0xb54f, 0xd6a0, 0xada2, 0x95b0, 0x4977,
    0x497f, 0xa4b0, 0xb4b5, 0x6a50, 0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970,
    0x6566, 0xd4a0, 0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
    0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2, 0xa950, 0xb557,
    0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573, 0x52bf, 0xa9a8, 0xe950, 0x6aa0,
    0xaea6, 0xab50, 0x4b60, 0xaae4, 0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0,
    0x96d0, 0x4dd5, 0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
    0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46, 0xab60, 0x9570,
    0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58, 0x5ac0, 0xab60, 0x96d5, 0x92e0,
    0xc960, 0xd954, 0xd4a0, 0xda50, 0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5,
    0xa950, 0xb4a0, 0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
    0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260, 0xea65, 0xd530,
    0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0, 0xd0b6, 0xd25f, 0xd520, 0xdd45,
    0xb5a0, 0x56d0, 0x55b2, 0x49b0, 0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0,
    0x4b63, 0x937f, 0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
    0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0, 0xa6d0, 0x55d4,
    0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50, 0x55a0, 0xaba4, 0xa5b0, 0x52b0,
    0xb273, 0x6930, 0x7337, 0x6aa0, 0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260,
    0xe968, 0xd520, 0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252,
    0xd520);

var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var chongArr = new Array("子午", "丑未", "寅申", "卯酉", "辰戌", "巳亥");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', ' ');

var jcName0 = new Array('建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭');
var jcName1 = new Array('闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开');
var jcName2 = new Array('开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收');
var jcName3 = new Array('收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成');
var jcName4 = new Array('成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破', '危');
var jcName5 = new Array('危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执', '破');
var jcName6 = new Array('破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定', '执');
var jcName7 = new Array('执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平', '定');
var jcName8 = new Array('定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满', '平');
var jcName9 = new Array('平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除', '满');
var jcName10 = new Array('满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建', '除');
var jcName11 = new Array('除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭', '建');

function jcr(d) {
    var jcrjx;
    if (d == '建') jcrjx = '宜：出行.上任.会友.上书.见工|忌：动土.开仓.嫁娶.纳采';
    if (d == '除') jcrjx = '宜：除服.疗病.出行.拆卸.入宅|忌：求官.上任.开张.搬家.探病';
    if (d == '满') jcrjx = '宜：祈福.祭祀.结亲.开市.交易|忌：服药.求医.栽种.动土.迁移';
    if (d == '平') jcrjx = '宜：祭祀.修填.涂泥.余事勿取|忌：移徙.入宅.嫁娶.开市.安葬';
    if (d == '定') jcrjx = '宜：易.立券.会友.签约.纳畜|忌：种植.置业.卖田.掘井.造船';
    if (d == '执') jcrjx = '宜：祈福.祭祀.求子.结婚.立约|忌：开市.交易.搬家.远行';
    if (d == '破') jcrjx = '宜：求医.赴考.祭祀.余事勿取|忌：动土.出行.移徙.开市.修造';
    if (d == '危') jcrjx = '宜：经营.交易.求官.纳畜.动土|忌：登高.行船.安床.入宅.博彩';
    if (d == '成') jcrjx = '宜：祈福.入学.开市.求医.成服|忌：词讼.安门.移徙';
    if (d == '收') jcrjx = '宜：祭祀.求财.签约.嫁娶.订盟|忌：开市.安床.安葬.入宅.破土';
    if (d == '开') jcrjx = '宜：疗病.结婚.交易.入仓.求职|忌：安葬.动土.针灸';
    if (d == '闭') jcrjx = '宜：祭祀.交易.收财.安葬|忌：宴会.安床.出行.嫁娶.移徙';
    return (jcrjx);
}

//国历节日  *表示放假日
var sFtv = new Array(
    "0101*元旦",
    "0106  中国13亿人口日",
    "0110  110宣传日",

    "0202  湿地日",
    "0204  抗癌症日",
    "0210  气象日",
    "0214  情人节",
    "0221  母语日",
    "0207  声援南非日",

    "0303  爱耳日",
    "0308  妇女节",
    "0312  植树节 孙中山逝世纪念日",
    "0315  消费者权益保护日",
    "0321  森林日",
    "0322  水日",
    "0323  气象日",
    "0324  防治结核病日",

    "0401  愚人节",
    "0407  卫生日",
    "0422  地球日",

    "0501*劳动节",
    "0504  青年节",
    "0505  碘缺乏病日",
    "0508  红十字日",
    "0512  护士节",
    "0515  家庭日",
    "0517  电信日",
    "0518  博物馆日",
    "0519  汶川地震哀悼日 助残日",
    "0520  学生营养日",
    "0522  生物多样性日",
    "0523  牛奶日",
    "0531  无烟日",

    "0601  儿童节",
    "0605  环境日",
    "0606  华人生肖文化节 爱眼日",
    "0617  防治荒漠化和干旱日",
    "0623  奥林匹克日",
    "0625  土地日",
    "0626  反毒品日",

    "0701  建党节 香港回归纪念日",
    "0707  抗日战争纪念日",
    "0711  人口日",

    "0801  建军节",
    "0815  日本无条件投降日",

    "0908  扫盲日",
    "0909  毛泽东逝世纪念日",
    "0910  教师节",
    "0916  臭氧层保护日",
    "0917  和平日",
    "0918  九·一八事变纪念日",
    "0920  爱牙日",
    "0927  旅游日",
    "0928  孔子诞辰",

    "1001*国庆节 音乐节 老人节",
    "1002  减轻自然灾害日",
    "1004  动物日",
    "1007  住房日",
    "1008  视觉日 高血压日",
    "1009  邮政日",
    "1010  辛亥革命纪念日 精神卫生日",
    "1015  盲人节",
    "1016  粮食节",
    "1017  消除贫困日",
    "1022  传统医药日",
    "1024  联合国日",
    "1025  人类天花绝迹日",
    "1026  足球诞生日",
    "1031  万圣节",

    "1107  十月社会主义革命纪念日",
    "1108  记者日",
    "1109  消防宣传日",
    "1110  青年节",
    "1112  孙中山诞辰",
    "1114  糖尿病日",
    "1117  大学生节",

    "1201  艾滋病日",
    "1203  残疾人日",
    "1209  足球日",
    "1210  人权日",
    "1212  西安事变纪念日",
    "1213  南京大屠杀",
    "1220  澳门回归纪念日",
    "1221  篮球日",
    "1224  平安夜",
    "1225  圣诞节 强化免疫日",
    "1226  毛泽东诞辰")
//农历节日  *表示放假日
var lFtv = new Array(
    "0101*春节、",
    // "0102*大年初二",
    // "0103*大年初三",
    "0105  路神生日",
    "0115  元宵节",
    "0202  龙抬头",
    // "0219  观世音圣诞",
    // "0404  寒食节",
    // "0408  佛诞节 ",
    "0505*端午节",
    "0606  天贶节 姑姑节",
    "0624  彝族火把节",
    "0707  七夕情人节",
    "0714  鬼节(南方)",
    "0715  盂兰节",
    // "0730  地藏节",
    "0815*中秋节",
    // "0909  重阳节",
    "1001  祭祖节",
    // "1117  阿弥陀佛圣诞",
    // "1208  腊八节 释迦如来成道日",
    "1223  过小年",
    "0100*除夕");
//佛教日历
lFtv.push('0101  弥勒佛圣诞',
    '0106  定光佛圣诞',
    '0909  帝释天尊圣诞',
    '0208  释迦牟尼佛出家',
    '0215  释迦牟尼佛涅槃',
    '0219  观世音菩萨圣诞',
    '0221  普贤菩萨圣诞',
    '0303  布袋和尚坐化日',
    '0316  准提菩萨圣诞',
    '0404  文殊菩萨圣诞',
    '0408  释迦牟尼佛圣诞',
    '0415  佛吉祥日',
    '0513  伽蓝菩萨圣诞',
    '0603  护法韦驮尊天菩萨圣诞',
    '0619  观世音菩萨成道',
    '0713  大势至菩萨圣诞',
    '0724  龙树菩萨圣诞',
    '0730  地藏菩萨圣诞',
    '0822  燃灯佛圣诞',
    '0919  观世音菩萨出家纪念日',
    '0930  药师琉璃光如来圣诞',
    '1005  达摩祖师圣诞',
    '1117  阿弥陀佛圣诞',
    '1208  释迦如来成道日',
    '1229  华严菩萨圣诞');


//某月的第几个星期几; 5,6,7,8 表示到数第 1,2,3,4 个星期几
var wFtv = new Array(
    "0110  黑人节",
    "0150  麻风日",
    "0121  日本成人节",
    "0520  母亲节",
    "0530  助残日",
    "0630  父亲节",
    "0716  合作节",
    "0730  被奴役国家周",
    "0932  和平日",
    "0940  聋人节 儿童日",
    "1011  住房日",
    "1144  感恩节")

/*****************************************************************************
日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1899] & 0xf) == 0xf ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {
    var lm = lunarInfo[y - 1900] & 0xf;
    return (lm == 0xf ? 0 : lm);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0, temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2100 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
    }

    if (offset < 0) {
        offset += temp;
        i--;
    }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
            --i;
            this.isLeap = true;
            temp = leapDays(this.year);
        }
        else {
            temp = monthDays(this.year, i);
        }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) {
            this.isLeap = false;
        }
        else {
            this.isLeap = true;
            --i;
        }

    if (offset < 0) {
        offset += temp;
        --i;
    }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}

//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear;   //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;    //公元日数字
    this.week = week;    //星期, 1个中文
    //农历
    this.lYear = lYear;   //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lDay = lDay;    //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    //八字
    this.cYear = cYear;   //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;    //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}

//============================== 返回阴历 (y年,m+1月)
function cyclical6(num, num2) {
    if (num == 0) return (jcName0[num2]);
    if (num == 1) return (jcName1[num2]);
    if (num == 2) return (jcName2[num2]);
    if (num == 3) return (jcName3[num2]);
    if (num == 4) return (jcName4[num2]);
    if (num == 5) return (jcName5[num2]);
    if (num == 6) return (jcName6[num2]);
    if (num == 7) return (jcName7[num2]);
    if (num == 8) return (jcName8[num2]);
    if (num == 9) return (jcName9[num2]);
    if (num == 10) return (jcName10[num2]);
    if (num == 11) return (jcName11[num2]);
}
function CalConv2(yy, mm, dd, y, d, m, dt, nm, nd) {
    var dy = d + '' + dd
    if ((yy == 0 && dd == 6) || (yy == 6 && dd == 0) || (yy == 1 && dd == 7) || (yy == 7 && dd == 1) || (yy == 2 && dd == 8) || (yy == 8 && dd == 2) || (yy == 3 && dd == 9) || (yy == 9 && dd == 3) || (yy == 4 && dd == 10) || (yy == 10 && dd == 4) || (yy == 5 && dd == 11) || (yy == 11 && dd == 5)) {
        return '日值岁破 大事不宜';
    }
    else if ((mm == 0 && dd == 6) || (mm == 6 && dd == 0) || (mm == 1 && dd == 7) || (mm == 7 && dd == 1) || (mm == 2 && dd == 8) || (mm == 8 && dd == 2) || (mm == 3 && dd == 9) || (mm == 9 && dd == 3) || (mm == 4 && dd == 10) || (mm == 10 && dd == 4) || (mm == 5 && dd == 11) || (mm == 11 && dd == 5)) {
        return '日值月破 大事不宜';
    }
    else if ((y == 0 && dy == '911') || (y == 1 && dy == '55') || (y == 2 && dy == '111') || (y == 3 && dy == '75') || (y == 4 && dy == '311') || (y == 5 && dy == '95') || (y == 6 && dy == '511') || (y == 7 && dy == '15') || (y == 8 && dy == '711') || (y == 9 && dy == '35')) {
        return '日值上朔 大事不宜';
    }
    else if ((m == 1 && dt == 13) || (m == 2 && dt == 11) || (m == 3 && dt == 9) || (m == 4 && dt == 7) || (m == 5 && dt == 5) || (m == 6 && dt == 3) || (m == 7 && dt == 1) || (m == 7 && dt == 29) || (m == 8 && dt == 27) || (m == 9 && dt == 25) || (m == 10 && dt == 23) || (m == 11 && dt == 21) || (m == 12 && dt == 19)) {
        return '日值杨公十三忌 大事不宜';
    }
    else {
        return 0;
    }
}


function calendar(y, m) {
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, lM2, lY2, lD2, tmp3, dayglus, bsg, xs, xs1, fs, fs1, cs, cs1
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;

    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期

    this.length = solarDays(y, m);    //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几

    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = sTerm(y, 2); //立春日期

    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y, m * 2) //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);

    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;

    for (var i = 0; i < this.length; i++) {

        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;           //农历年
            lM = lDObj.month;          //农历月
            lD = lDObj.day;            //农历日
            lL = lDObj.isLeap;         //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天

            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }

        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical + i);
        lD2 = (dayCyclical + i);

        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7],
            lY, lM, lD++, lL,
            cY, cM, cD);


        this[i].sgz5 = CalConv2(lY2 % 12, lM2 % 12, (lD2) % 12, lY2 % 10, (lD2) % 10, lM, lD - 1, m + 1, cs1);
        this[i].sgz3 = cyclical6(lM2 % 12, (lD2) % 12);


    }

    //节气
    tmp1 = sTerm(y, m * 2) - 1;
    tmp2 = sTerm(y, m * 2 + 1) - 1;
    this[tmp1].solarTerms = solarTerm[m * 2];
    this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    if (m == 3) this[tmp1].color = 'red'; //清明颜色

    //国历节日
    for (i in sFtv)
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == (m + 1)) {
                this[Number(RegExp.$2) - 1].solarFestival += RegExp.$4 + '  '
                if (RegExp.$3 == '*') this[Number(RegExp.$2) - 1].color = 'red'
            }


    //农历节日
    for (i in lFtv)
        if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1 = Number(RegExp.$1) - firstLM
            if (tmp1 == -11) tmp1 = 1
            if (tmp1 >= 0 && tmp1 < n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1
                if (tmp2 >= 0 && tmp2 < this.length) {
                    this[tmp2].lunarFestival += RegExp.$4 + '  '
                    if (RegExp.$3 == '*') this[tmp2].color = 'red'
                }
            }
        }

    //复活节只出现在3或4月
    if (m == 2 || m == 3) {
        var estDay = new easter(y);
        if (m == estDay.m)
            this[estDay.d - 1].solarFestival = this[estDay.d - 1].solarFestival + ' 复活节(Easter Sunday)';
    }


    //黑色星期五
    if ((this.firstWeek + 12) % 7 == 5)
        this[12].solarFestival += '黑色星期五';

    //今日
    if (y == tY && m == tM) this[tD - 1].isToday = true;
}

//======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
function easter(y) {

    var term2 = sTerm(y, 5); //取得春分日期
    var dayTerm2 = new Date(Date.UTC(y, 2, term2, 0, 0, 0, 0)); //取得春分的公历日期控件(春分一定出现在3月)
    var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

    if (lDayTerm2.day < 15) //取得下个月圆的相差天数
        var lMlen = 15 - lDayTerm2.day;
    else
        var lMlen = (lDayTerm2.isLeap ? leapDays(y) : monthDays(y, lDayTerm2.month)) - lDayTerm2.day + 15;

    //一天等于 1000*60*60*24 = 86400000 毫秒
    var l15 = new Date(dayTerm2.getTime() + 86400000 * lMlen); //求出第一次月圆为公历几日
    var dayEaster = new Date(l15.getTime() + 86400000 * (7 - l15.getUTCDay())); //求出下个周日

    this.m = dayEaster.getUTCMonth();
    this.d = dayEaster.getUTCDate();

}
//======================  中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}
var global = {
    currYear: -1, // 当前年
    currMonth: -1, // 当前月，0-11
    currDate: null, // 当前点选的日期
    minYear: 1901,
    maxYear: 2100,
    uid: null,
    username: null,
    email: null,
    single: false
    // 是否为独立页调用，如果是值为日历id，使用时请注意对0的判断，使用 single !== false 或者 single === false
};
var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();

// 将农历iLunarMonth月格式化成农历表示的字符串
function FormatLunarMonth(iLunarMonth) {
    var szText = new String("正二三四五六七八九十");
    var strMonth;
    if (iLunarMonth <= 10) {
        strMonth = szText.substr(iLunarMonth - 1, 1);
    }
    else if (iLunarMonth == 11) strMonth = "十一";
    else strMonth = "十二";
    return strMonth + "月";
}
// 将农历iLunarDay日格式化成农历表示的字符串
function FormatLunarDay(iLunarDay) {
    var szText1 = new String("初十廿三");
    var szText2 = new String("一二三四五六七八九十");
    var strDay;
    if ((iLunarDay != 20) && (iLunarDay != 30)) {
        strDay = szText1.substr((iLunarDay - 1) / 10, 1) + szText2.substr((iLunarDay - 1) % 10, 1);
    }
    else if (iLunarDay != 20) {
        strDay = szText1.substr(iLunarDay / 10, 1) + "十";
    }
    else {
        strDay = "二十";
    }
    return strDay;
}
/*查字符在数据中位置*/
function arrIndex(txt, arr) { for (var i = 0; i <= arr.length; i++) { if (arr[i] == txt) return i; } }
/*星座算法*/
function getXZ(day) {
    var mxz = "";
    var szArr = ["白羊座|3.21-4.19", "金牛座|4.20-5.20", "双子座|5.21-6.21", "巨蟹座|6.22-7.22", "狮子座|7.23-8.22", "处女座|8.23-9.22", "天秤座|9.23-10.23", "天蝎座|10.24-11.22", "射手座|11.23-12.21", "水瓶座|1.20-2.18", "双鱼座|2.19-3.20"];
    $.each(szArr, function (i, val) {
        var xz = val.split("|"), rq = xz[1].split("-"), da = rq[0].split("."), db = rq[1].split(".");
        if (day >= rq[0] && day <= rq[1]) { mxz = xz[0]; }
        if (mxz == "") { mxz = "魔羯座" }
    })
    return mxz;
}
/*每日胎神*/
function taisheng(gz) {
    var tg = gz.substr(0, 1);
    var dz = gz.substr(1, 1);
    var rbka, rbkb;
    var tgc = ["甲己之日占在门", "乙庚碓磨莫移动", "丙辛厨灶莫相干", "丁壬仓库忌修弄", "戊癸房床若移整"];
    var dzc = ["子午二日碓须忌", "丑未厕道莫修移", "寅申火炉休要动", "卯酉大门修当避", "辰戌鸡栖巳亥床"];
    for (i = 0; i <= 4; i++) {
        if (tgc[i].indexOf(tg) >= 0) { rbka = tgc[i]; }
        if (dzc[i].indexOf(dz) >= 0) { rbkb = dzc[i]; }
    }
    return rbka + " " + rbkb;
}
/*日支相冲*/
function chong(gz) {
    var dz = gz.substr(1, 1), cx = "", sx;
    for (var i = 0; i <= chongArr.length - 1; i++) {
        if (chongArr[i].indexOf(dz) >= 0) cx = chongArr[i];
    }
    cdz = cx.replace(dz, "");
    sxi = arrIndex(cdz, Zhi);
    return "冲" + Animals[sxi] + " (" + cx + "相冲)";
}
/*算纳音*/
function nayin(zhu) {
    var nayin = ["甲子乙丑|海中金", "丙寅丁卯|炉中火", "戊辰己巳|大林木", "庚午辛未|路旁土", "壬申癸酉|剑锋金", "甲戌乙亥|山头火", "丙子丁丑|涧下水", "戊寅己卯|城墙土", "庚辰辛巳|白腊金", "壬午癸未|杨柳木", "甲申乙酉|泉中水", "丙戌丁亥|屋上土", "戊子己丑|霹雷火", "庚寅辛卯|松柏木", "壬辰癸巳|常流水", "甲午乙未|沙中金", "丙申丁酉|山下火", "戊戌己亥|平地木", "庚子辛丑|壁上土", "壬寅癸卯|金箔金", "甲辰乙巳|覆灯火", "丙午丁未|天河水", "戊申己酉|大驿土", "庚戌辛亥|钗钏金", "壬子癸丑|桑松木", "甲寅乙卯|大溪水", "丙辰丁巳|沙中土", "戊午己未|天上火", "庚申辛酉|石榴木", "壬戌癸亥|大海水"];
    for (i = 0; i <= nayin.length - 1; i++) {
        if (nayin[i].indexOf(zhu) >= 0) {
            return nayin[i].split("|")[1];
        }
    }
}
/*彭祖百忌*/
function pzbj(gz) {
    var pzbjG = ["不开仓财物耗散", "不栽植千株不长", "不修灶必见灾殃", "不剃头头必生疮", "不受田田主不祥", "不破券二比并亡", "不经络织机虚张", "不合酱主人不尝", "不汲水更难提防", "不词讼理弱敌强"];
    var pzbjZ = ["不问卜自惹祸殃", "不冠带主不还乡", "不祭祀神鬼不尝", "不穿井水泉不香", "不哭泣必主重丧", "不远行财物伏藏", "不苫盖屋主更张", "不服药毒气入肠", "不安床鬼祟入房", "不宴客醉坐颠狂", "不吃犬作怪上床", "不嫁娶不利新郎"];
    var tg = gz.substr(0, 1);
    var dz = gz.substr(1, 1);
    var gi = arrIndex(tg, Gan), zi = arrIndex(dz, Zhi), baiji = "";
    return pzbjG[gi] + " " + pzbjZ[zi];
}
/*计算上下年月*/
function conty(SY, SM) {
    if (SM > 11) { SM = 0; SY += 1 }
    if (SM < 0) { SM = 11; SY -= 1 }
    if (SY < global.minYear) { SY = global.minYear; }
    if (SY > global.maxYear) { SY = global.maxYear; }
    return [SY, SM];
}
var cld, pcld, ncld;
function GetNong(cObj, sD) {
    //输出日期
    var nD ,s;
    if (cObj[sD].lDay == 1) {
        nD = '<b>' + (cObj[sD].isLeap ? '闰' : '') + cObj[sD].lMonth + '月' + (monthDays(cObj[sD].lYear, cObj[sD].lMonth) == 29 ? '小' : '大') + '</b>'
    } else {
        nD = cDay(cObj[sD].lDay);
    }
    //输出节日
    s=cObj[sD].lunarFestival.replace(/\s*/g,'')
    // s = $.trim(cObj[sD].lunarFestival); //清空
    if (s.length > 0) {
        nD = s;
    } else {
        s = cObj[sD].solarTerms.replace(/\s*/g,'') || cObj[sD].solarTerms;
        // s = $.trim(cObj[sD].solarFestival) || cObj[sD].solarTerms;
        if (s.length > 0) { nD = s }
    }
    return nD
}
const  drawCld = function drawCld(SY, SM) {
    cld = new calendar(SY, SM);
    global.currYear = SY;
    global.currMonth = SM;
    var alltd = cld.firstWeek + cld.length;

    var pevD = conty(SY, SM - 1);
    var nxtD = conty(SY, SM + 1);
    var curD = [SY, SM];
    var dayArr = [];
    pcld = new calendar(pevD[0], pevD[1]);
    ncld = new calendar(nxtD[0], nxtD[1]);
    for ( var i = 0; i <= 41; i++) {
        var aD = i - cld.firstWeek;
        var gD = "", nD = "", isday = "", dt = "";
        if (i < cld.firstWeek) {
            gD = pcld.length + aD + 1;
            nD = GetNong(pcld, gD - 1);
            dt = pevD[0] + "-" + (pevD[1] + 1);
            isday = "unday";
        } else if (i >= (cld.firstWeek + cld.length)) {
            gD = aD - cld.length + 1;
            nD = GetNong(ncld, gD - 1);
            dt = nxtD[0] + "-" + (nxtD[1] + 1);
            isday = "unday";
        } else {
            gD = aD + 1;
            nD = GetNong(cld, gD - 1);
            dt = curD[0] + "-" + (curD[1] + 1);
            cld[aD].isToday ? isday = "isday jingri" : isday = "isday";
        }
        dayArr[i] = [gD, nD, dt, isday];
    }/*end For*/
    return { gongli: SY + "年 " + (SM + 1) + "月", nongli: cyclical(SY - 1900 + 36) + '年&nbsp;【' + Animals[(SY - 4) % 12] + '年】', date: dayArr };
}
const getData =   function getData(v) {//返回当日信息
    var vArr = v.split("-");
    var y = vArr[0], m = vArr[1] - 1, d = vArr[2] - 1;
    var tObj = new calendar(y, m);
    // tObj[d].sgz5 != 0 ? jy = tObj[d].sgz5 : jy = jcr(tObj[d].sgz3);//读取宜忌
    var arr = [
        tObj[d].sDay,/*日*/
        tObj[d].sYear + '年' + tObj[d].sMonth + '月' + tObj[d].sDay + '日',/*公历日期*/
        '星期' + tObj[d].week,
        // getXZ(tObj[d].sMonth + "." + tObj[d].sDay),/*星座*/
        Animals[(y - 4) % 12],/*生肖*/
        (tObj[d].isLeap ? '闰' : ' ') + FormatLunarMonth(tObj[d].lMonth) + FormatLunarDay(tObj[d].lDay),/*农历日期*/
        [tObj[d].cYear, tObj[d].cMonth, tObj[d].cDay],/*干支*/
        // [nayin(tObj[d].cYear), nayin(tObj[d].cMonth), nayin(tObj[d].cDay)],/*纳音*/
        // jy,
        // chong(tObj[d].cDay), /*日支相冲*/
        // taisheng(tObj[d].cDay), /*每日胎神*/
        // pzbj(tObj[d].cDay), /*彭祖百忌*/
        [tObj[d].solarTerms, tObj[d].solarFestival, tObj[d].lunarFestival] /*节日*/
    ];
    return arr;
}

export default  {
    getData, //详情
    drawCld,//每月日历
}