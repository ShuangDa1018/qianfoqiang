<template>
    <div class="header" >
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">{{ title }}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- 用户头像 -->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="changePass">修改登录密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <Dialog
            title="修改登录密码"
            :loading="newPass.loading"
            :disabled="newPass.disabled"
            @save="changePassword"
            :minWidth="615"
            :showStatus="changePassDialog"
            @close="changePassDialog = false"
        >
            <template slot="form">
                <el-form>
                    <el-form-item label="新密码">
                        <el-input placeholder="新密码" v-model="newPass.pass1" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="重复新密码">
                        <el-input placeholder="重复新密码" v-model="newPass.pass2" type="password"></el-input>
                    </el-form-item>
                    <div class="m-b-10 caption red">为了账号安全，修改成功后将退出登录</div>
                </el-form>
            </template>
        </Dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    components: {
        pageNation: () => import('../view/pageNation'),
        Dialog: () => import('../view/dialog')
    },
    data() {
        return {
            changePassDialog: false,
            collapse: false,
            fullscreen: false,
            name: '未登录',
            message: 2,
            newPass: {},
            title: process.env.VUE_APP_NAVIGATION_TITLE,
            loading: false
        };
    },
    computed: {
        username() {
            let username = '未登录';
            try {
                username = JSON.parse(localStorage.getItem(this.$func.projectName() + '_user')).info.name;
            } catch (e) {}
            return username ? username : this.name;
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem(this.$func.projectName()+'_user'))
        if(user.info.buddhaHallId){
            this.getbuddhahall()
        }
    },

    destroyed() {},
    methods: {
        // 获取佛像名称
        getbuddhahall(){
            this.$axios.get('bd/buddha/getbuddhahall').then(res=>{
                this.title=`${res.name}-子平台后台管理系统`
            })
        },
        changePassword() {
            let newpass = this.newPass;
            if (!this.newPass.pass1) {
                this.toast('请输入密码');
                return;
            }
            if (!this.newPass.pass2) {
                this.toast('请确认密码');
                return;
            }
            if (!(this.newPass.pass1 == this.newPass.pass2)) {
                this.toast('两次密码不一致');
                return;
            }
            this.selfLoading(this.newPass, true);
            this.$axios
                .post('manager/pass', { password: this.newPass.pass1 })
                .then((it) => {
                    this.toast('修改成功,即将跳转', 'success');
                    this.selfLoading(this.newPass, false);
                    this.addProperty(this.newPass, 'disabled', true);
                    setTimeout(() => {
                        this.changePassDialog = false;
                        this.doLogout();
                    }, 1500);
                })
                .catch((it) => {
                    this.selfLoading(this.newPass, false);
                });
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                this.doLogout();
            }
            if (command == 'changePass') {
                this.changePassDialog = true;
            }
        },
        doLogout() {
            localStorage.removeItem(this.$func.projectName() + '_user');
            localStorage.removeItem(this.$func.projectName() + '_permissions');
            this.$router.push('/login');
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    background: #CD8020;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header-menu {
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
}
.header .logo {
    float: left;
    width: 400px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
