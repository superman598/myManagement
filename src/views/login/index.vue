<template>
  <div class="login-container">
    <div class="content">
      <div class="title_content">
        <img src="../../assets/login_images/login.jpeg" class="login_image">
        <div class="title">
          <h3>欢迎使用</h3>
          <p>设计院项目督办管理系统</p>
          <span>xxxxxxxx</span>
        </div>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="login_form">
          <div class="login_form_content">
            <div class="login_title">登录</div>
            <div class="form">
              <el-form-item prop="username">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-user"
                />
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
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>
      </div>
    </el-form> -->
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
      console.log(1111)
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
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #000;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
// .login-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }
</style>

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

  // .login-form {
  //   position: relative;
  //   width: 520px;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   overflow: hidden;
  // }

  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;

  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

  // .svg-container {
  //   padding: 6px 5px 6px 15px;
  //   color: $dark_gray;
  //   vertical-align: middle;
  //   width: 30px;
  //   display: inline-block;
  // }

  // .title-container {
  //   position: relative;

  //   .title {
  //     font-size: 26px;
  //     color: $light_gray;
  //     margin: 0px auto 40px auto;
  //     text-align: center;
  //     font-weight: bold;
  //   }
  // }

  // .show-pwd {
  //   position: absolute;
  //   right: 10px;
  //   top: 7px;
  //   font-size: 16px;
  //   color: $dark_gray;
  //   cursor: pointer;
  //   user-select: none;
  // }

  // .thirdparty-button {
  //   position: absolute;
  //   right: 0;
  //   bottom: 6px;
  // }

  // @media only screen and (max-width: 470px) {
  //   .thirdparty-button {
  //     display: none;
  //   }
  // }
}
</style>
