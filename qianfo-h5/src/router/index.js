import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const importPage = views => () => import(`../views/${views}.vue`)

Vue.use(VueRouter);
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  // redirect: '/calendar',
  children: [
    {
      path: '/wx_auth',
      name: 'wx_auth',
      component: importPage('weixin/wx_auth'),
      meta: { title: "请用微信扫码登录" }
    },
    {
      path: '/buddha',
      name: 'buddha',
      component: importPage('buddha'),
      meta: { title: "佛乐" }
    },
    {
      path: '/payment',
      name: 'payment',
      component: importPage('payment'),
      meta: { title: "修功德" }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: importPage('paySuccess'),
      meta: { title: "支付成功" }
    },
    {
      path: '/pledge',
      name: 'pledge',
      component: importPage('pledge'),
      meta: { title: "认捐佛像" }
    },
    {
      path: '/pledgeSuccess',
      name: 'pledgeSuccess',
      component: importPage('pledgeSuccess'),
      meta: { title: "预约认领" }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: importPage('calendar/calendar'),
      meta: { title: "佛像" },
    },
    {
      path: '/calendar/lotus',
      name: 'lotus',
      component: importPage('calendar/lotus'),
      meta: { title: '太平禅寺千佛墙供养系统' }
    },
    {
      path: '/calendar/rili',
      name: 'rili',
      component: importPage('calendar/rili/rili'),
      meta: { title: '佛教万年历' }
    }

  ]
},

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title //浏览器标题
  if (to.path == '/wx_auth') {
    next();
    return
  }
  // 判断是否为公众号模拟器环境
  const isWechat = () => {
    return (String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger");
  };
  console.log(to)
  if (!isWechat()) {
    next({
      path: '/wx_auth'
    });//跳转页面 结束
    return
  }
  // 判断公众号截取code
  const getUrlParam = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  };
  let code = getUrlParam("code"); //是否存在code
  if (!code) {
    // 获取token
    let appid = "wx5e4724fa68c00771"; //为测试号id
    // let local = window.location.href;
    const a  = to.query.buddhahallId
    let local = `http://wall.longpeng.dev.cq1080.com/index.html#${to.path}?buddhaHallId=${a}`		//要加http：// 微信公众号不加
    //不存在就打开上面的地址进行授权
    console.log("local:",local)
    // return;
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
  } else {
    sessionStorage.setItem('code', code)
    sessionStorage.setItem('buddhaHallId', 111)
    next();
  }
  
})


export default router