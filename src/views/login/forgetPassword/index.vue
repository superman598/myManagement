<template>
  <div class="login-container">
    <div class="content">
      <div class="title_content">
        <img src="../../../assets/login_images/login.jpeg" class="login_image">
        <div class="title">
          <h3>欢迎使用</h3>
          <p>设计院项目督办管理系统</p>
          <span>xxxxxxxx</span>
        </div>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="login_form">
          <div class="login_form_content">
            <div class="login_title">密码找回</div>
            <div class="form">
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入账号"
                  prefix-icon="el-icon-user"
                />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input
                  ref="phone"
                  v-model="loginForm.username"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-phone"
                >
                  <el-button type="primary" size="mini">发送验证码</el-button>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input ref="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password />
              </el-form-item>
              <el-form-item prop="remember">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </el-form-item>
            </div>
            <div class="login_btn">
              <el-button type="primary" round @click.native.prevent="handleLogin">登录</el-button>
            </div>
            <div class="pwd_forget">
              <span @click="fogetPwd">忘记密码</span>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: { },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      // username: '',
      // password: '',
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    console.log(document.body.clientWidth)
    console.log(document.body.clientHeight)
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 忘记密码
    fogetPwd() {
      // this.$router.push('/home')
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录按钮
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$bgo:#D6E9FF;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bgo;
  overflow: hidden;
  .content{
    width:6rem;
    height: 3.5rem;
    background-color: #fff;
    margin: auto;
    margin-top: .8rem;
    border-radius: 20px;
    display: flex;
    .title_content{
      width: 3rem;
      height: 100%;
      // background-color: red;
      position: relative;
      .login_image{
        width: 100%;
        height: 100%;
        position: absolute;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      .title{
        width: 100%;
        position: absolute;
        color: #fff;
        text-align: center;
        h3{
          font-size: 36px;
          font-weight: normal;
          margin: 60px 0 0;
        }
        p{
          font-size: 18px;
        }
        span{
          font-size: 12px;
        }
      }
    }
    .login_form{
      width: 3rem;
      height: 100%;
      // background-color: green;
      .login_form_content{
        width: 2.5rem;
        height: 50%;
        // background: skyblue;
        margin: auto;
        margin-top: 25%;
        // text-align: center;
        .login_title{
          width:50px;
          height:26px;
          border-bottom:1px solid #6B89E1;
          font-size: 10px;
          font-weight: 700;
          text-align: center;
          line-height: 26px;
          margin: auto;
        }
        .form{
          width: 80%;
          // height: 60px;
          // background-color: #000;
          margin: 20px auto 0;
        }
        ::v-deep.el-input__inner{
            border-radius: 0;
            border: none;
            border-bottom: .5px solid #dcdcdc;
          }
        .login_btn{
          width: 80%;
          margin: 10px auto 10px;
          text-align: center;
          .el-button{
            width: 70%;
            background-color: #3A62D7;
          }
        }
        .pwd_forget{
          width: 80%;
          text-align: center;
          margin: auto;
          cursor: pointer;
          // span{

          // }
        }
      }
    }
  }
}
</style>
