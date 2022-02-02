<template>
  <div class="register-vue" :style="bg">
    <div class="container">
      <p class="title">用户注册</p>
      <p style="color:red">{{msg}}</p>
      <div class="input-c">
        <Input
          prefix="ios-contact"
          v-model="account"
          placeholder="用户名"
          clearable
          @on-blur="verifyAccount"
        />
        <p class="error">{{ accountError }}</p>
      </div>
      <div class="input-c">
        <Input
          type="password"
          v-model="pwd"
          prefix="md-lock"
          placeholder="密码"
          clearable
          @on-blur="verifyPwd"
          @keyup.enter.native="submit"
        />
        <p class="error">{{ pwdError }}</p>
      </div>
      <Button
        :loading="isShowLoading"
        class="submit"
        type="primary"
        @click="submit"
        >登陆</Button
      >
      <p class="account">
        <span @click="register">注册账号</span> |
        <span @click="forgetPwd">忘记密码</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
            msg: '',
        }
    },
    created() {
    // eslint-disable-next-line no-useless-concat
        this.bg.backgroundImage = 'url('
      + 'https://cn.bing.com/th?id=OHR.OceanHeart_ZH-CN2697021215_UHD.jpg'
      + ')'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.account.length < 5) {
                this.accountError = '账号长度不少于5'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.pwd.length < 5) {
                this.pwdError = '密码长度不少于5'
            } else {
                this.pwdError = ''
            }
        },
        register() {},
        forgetPwd() {},
        submit() {
            // let params = {
            //     username: this.account,
            //     password: this.pwd,
            // }
            // this.axios
            // .post('http://localhost:8081/user/register', JSON.stringify(params), {
            //     headers: {
            //         'Content-Type': 'application/json;charset=UTF-8',
            //     },
            // })
            let params = new FormData()
            params.append('username', this.account)
            params.append('password', this.pwd)
            this.axios
            .post('http://localhost:8081/user/register', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res)

                // 登录成功
                if (res.status == 200 && res.data.success == true) {
                    // 解析jwt用户信息
                    let token = res.data.token
                    let strings = token.split('.')
                    console.log(strings[0])
                    let userInfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))))
                    console.log(userInfo)
                    this.isShowLoading = true
                    // 登陆成功 设置用户信息
                    localStorage.setItem(
                        'userImg',
                        'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4'
                    )
                    localStorage.setItem('userName', userInfo.username)
                    // 登陆成功 假设这里是后台返回的 token
                    localStorage.setItem('token', token)
                    this.$router.push({ path: this.redirect || '/' })
                }
                this.msg = res.data.msg
                this.pwd = ''
            })
            .catch((err) => {
                console.error(err)
            })
        },
    },
}
</script>

<style scoped>
.register-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.register-vue .container {
  background: rgba(255, 255, 255, 0.5);
  width: 300px;
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.register-vue .ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.register-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.register-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.register-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.register-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.register-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.register-vue .input-c {
  margin: auto;
  width: 200px;
}
.register-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.register-vue .submit {
  width: 200px;
}
.register-vue .account {
  margin-top: 30px;
}
.register-vue .account span {
  cursor: pointer;
}
.register-vue .ivu-icon {
  color: #eee;
}
.register-vue .ivu-icon-ios-close-circle {
  color: #777;
}
</style>
