import Vue from 'vue';
import Router from 'vue-router';
const importPage = view => () => import(`../components/page/${view}.vue`);
const importCommon = view => () => import(`../components/common/${view}.vue`);

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        redirect: '/index/index'
    },
    {
        path: '/',
        component: importCommon('Home'),
        meta: {
            title: '自述文件'
        },
        name: 'home',
        children: [
            {
                path: '/index',
                component: importCommon('empty'),
                meta: {
                    title: '系统首页',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'index',
                        component: importPage('index/index'),
                        meta: {
                            title: '统计图',
                        }
                    },
                ]
            },
            {
                path: '/system',
                component: importCommon('empty'),
                meta: {
                    title: '系统设置',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'manager',
                        component: importPage('manager/ManagerList'),
                        meta: {
                            title: '设置管理员',
                        }
                    },
                    {
                        path: 'role',
                        component: importPage('auth/role'),
                        meta: {
                            title: '角色设置',
                        }
                    }, {
                        path: "setting",
                        component: importPage("setting/index"),
                        meta: {
                            title: "系统配置"
                        }
                    },
                    {
                        path: "log",
                        component: importPage("setting/log"),
                        meta: {
                            title: "系统日志"
                        }
                    }
                ]
            },

            {
                path: '/buddha',
                component: importCommon('empty'),
                meta: {
                    title: '功德管理',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'buddha',
                        component: importPage('buddha/buddha'),
                        meta: {
                            title: '佛像管理'
                        }
                    },
                    {
                        path: 'detail',
                        component: importPage('common/detail'),
                        hide: true,
                        meta: {
                            title: '详情',
                            type: "ADD"
                        }
                    },
                    {
                        path: 'buddhahall',
                        component: importPage('buddha/buddhahall'),
                        meta: {
                            title: '佛殿列表',
                        }
                    },
                    {
                        path: 'buddhahallEdit',
                        component: importPage('buddha/buddhahallAdd'),
                        hide: true,
                        meta: {
                            title: '编辑佛殿',
                            type: 'ADD'
                        }
                    },
                    {
                        path: 'buddhahallAdd',
                        component: importPage('buddha/buddhahallAdd'),
                        hide: true,
                        meta: {
                            title: '新增佛殿',
                            type: 'ADD'
                        }
                    },
                    {
                        path: 'wallDetail',
                        component: importPage('buddha/wallDetail'),
                        hide: true,
                        meta: {
                            title: '千佛墙管理',
                            type: 'ADD'
                        }
                    },
                    {
                        path: 'equipment',
                        component: importPage('buddha/equipment'),
                        meta: {
                            title: '设备列表'
                        }
                    },
                    {
                        path: 'donate',
                        component: importPage('buddha/donate'),
                        meta: {
                            title: '捐款人列表'
                        }
                    },
                    {
                        path: 'accessbuddha',
                        component: importPage('buddha/accessbuddha'),
                        meta: {
                            title: '预约认捐佛像'
                        }
                    },
                ]
            },
            {
                path: '/buddhamusic',
                component: importCommon('empty'),
                meta: {
                    title: '祈福管理',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'buddhamusic',
                        component: importPage('buddhamusic/buddhamusic'),
                        meta: {
                            title: '佛乐设置'
                        }
                    },
                    {
                        path: 'buddhamusicclassification',
                        component: importPage('buddhamusic/buddhamusicclassification'),
                        meta: {
                            title: '佛乐分类'
                        }
                    },
                    {
                        path: 'buddhalanguage',
                        component: importPage('buddhamusic/buddhalanguage'),
                        meta: {
                            title: '祝福语设置'
                        }
                    },
                    {
                        path: 'buddhalanguageclassification',
                        component: importPage('buddhamusic/buddhalanguageclassification'),
                        meta: {
                            title: '祝福语分类'
                        }
                    },
                    {
                        path: 'buddhafestival',
                        component: importPage('buddhamusic/buddhafestival'),
                        meta: {
                            title: '佛教节日设置'
                        }
                    },



                ]
            },
            {
                path: '/children/index',
                component: importCommon('empty'),
                meta: {
                    title: '子平台系统首页',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'index',
                        component: importPage('children/index/index'),
                        meta: {
                            title: '统计图',
                        }
                    },
                ]
            },
            {
                path: '/children/setting',
                component: importCommon('empty'),
                meta: {
                    title: '子平台系统设置',
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'manager',
                        component: importPage('children/setting/ManagerList'),
                        meta: {
                            title: '设置管理员',
                        }
                    },
                     {
                        path: 'role',
                        component: importPage('children/setting/role'),
                        meta: {
                            title: '角色设置',
                        }
                    },
                    {
                        path: "buddhahallinfo",
                        component: importPage("children/setting/buddhahallinfo"),
                        meta: {
                            title: "网页设置"
                        }
                    },
                    {
                        path: "log",
                        component: importPage("children/setting/log"),
                        meta: {
                            title: "系统日志"
                        }
                    }
                ]
            },
            {
                path: '/children/thousandBuddha',
                component: importCommon('empty'),
                meta: {
                    title: "子平台功德管理",
                    icon: 'el-icon-setting'
                },
                children: [
                    {
                        path: 'thousandBuddha',
                        component:importPage('children/thousandBuddha/thousandBuddha'),
                        meta:{
                            title:'千佛墙'
                        }
                    },
                    {
                        path: 'buddha',
                        component: importPage('children/thousandBuddha/buddha'),
                        meta: {
                            title: '佛像管理'
                        }
                    },
                    {
                        path: 'donate',
                        component: importPage('children/thousandBuddha/donate'),
                        meta: {
                            title: '捐款人列表'
                        }
                    },
                    {
                        path: 'accessbuddha',
                        component: importPage('children/thousandBuddha/accessbuddha'),
                        meta: {
                            title: '预约认领佛殿'
                        }
                    },
                    
                    
                   
                ]
            },
            



            {
                path: '/404',
                hide: false,
                component: importPage('404'),
                meta: {
                    title: '404'
                }
            }, {
                path: '/403',
                hide: true,
                component: importPage('403'),
                meta: {
                    title: '403'
                }
            },
        ]
    },
    {
        path: '/login',
        component: importPage('Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        component: importPage('Register'),
        meta: {
            title: '注册'
        }
    }
    ]
});