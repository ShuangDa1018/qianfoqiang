<template>
    <div class="login-wrap">
        <div class="ms-login">
            <!-- <div class="ms-title">{{ title }}</div> -->
            <div style="display: flex; padding-top: 15px">
                <img src="@/assets/img/logo.jpg" style="width: 80px; height: 56px; margin: 0 auto" alt="" />
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="mobile">
                    <el-input v-model="param.mobile" placeholder="用户名">
                        <div slot="prepend" class="icon el-icon-user"></div>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <div slot="prepend" class="icon el-icon-lock"></div>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            param: {
                mobile: null,
                password: null,
                clientId: 'manager',
                newPass: {}
            },
            title: process.env.VUE_APP_NAVIGATION_TITLE,
            rules: {
                mobile: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    this.doLogin();
                } else {
                    this.$message.error('请输入账号和密码');

                    return false;
                }
            });
        },
        doLogin() {
            this.$axios.post('manager/login', this.param).then((it) => {
                if (it) {
                    let permiss = [];
                    let tag = it.info.tag
                    localStorage.setItem(this.$func.projectName() + '_user', JSON.stringify(it));
                    let permissions = it.permissions;
                    let allowedMenu = permissions.map((it) => {
                        return it.path;
                    });
                    let routers = this.$router.options.routes.filter((it) => {
                        return it.name == 'home';
                    })[0].children;
                    let userType = it.info && it.info.type;
                    let items = routers.map((it) => {
                        let item = {
                            icon: it.meta.icon,
                            title: it.meta.title,
                            index: it.path,
                            hide: it.hide
                        };
                        if (it.children) {
                            item.subs = it.children
                                .map((child) => {
                                    let path = child.path.indexOf('/') == 0 ? child.path : it.path + '/' + child.path;
                                    return {
                                        index: path,
                                        title: child.meta.title,
                                        menu: it.meta.title + ',' + child.meta.title,
                                        hide: child.hide
                                    };
                                })
                                .filter((sub) => {
                                    return allowedMenu.indexOf(sub.menu) > -1 || userType == 'SUPER_MANAGER'||userType == 'SUB_SUPER_MANAG';
                                });
                        }
                        return item;
                    });
                    
                    items = items.filter((it) => {
                        if (tag =='default'&&userType=='SUPER_MANAGER'&&(it.title=='子平台系统设置'||it.title=='子平台功德管理'||it.title=='子平台系统首页')){ //限制超级管理员权限
                    return false
                        }
                        if (tag =='buddhahall'&&userType=='SUB_SUPER_MANAG'&&(it.title=='系统设置'||it.title=='功德管理'||it.title=='系统首页'||it.title=='祈福管理')){
                            return false
                        }
                        if (!it.subs || !it.subs.length || it.hide) {
                            return false;
                        }
                        it.subs = it.subs.filter((item) => {
                            if (item.hide) {
                                return false;
                            }
                            return true;
                        });
                        return true;
                    });
                  
                    items.forEach((item) => {
                        if (item && item.subs && item.subs.length) {
                            item.subs.forEach((it) => {
                                permiss.push(it.index);
                            });
                        }
                    });
                    localStorage.setItem(this.$func.projectName() + '_permissions', JSON.stringify(permiss));
                    this.$router.push(permiss[0]);
                }
            });
        }
    }
};
</script>

<style scoped>
.el-button--primary {
    background-color: #cd8020;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
