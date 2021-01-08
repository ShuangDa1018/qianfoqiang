<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">初始化超级管理员</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="mobile">
                    <el-input v-model="param.mobile" placeholder="用户名">
                        <i slot="prepend" class="icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password">
                        <i slot="prepend" class="icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="确认密码" v-model="param.passwordAgain" @keyup.enter.native="submitForm()">
                        <i slot="prepend" class="icon el-icon-lock"></i>
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
                passwordAgain: null,
                clientId: 'manager',
                name: '超级管理员'
            },
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
            this.$axios.post('manager/init', this.param).then((item) => {
                this.$axios.post('manager/login', this.param).then((it) => {
                    localStorage.setItem(this.$func.projectName() + '_user', JSON.stringify(it));
                    this.$router.push('/');
                });
            });
        }
    }
};
</script>

<style scoped>
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
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
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
