import Vue from 'vue'
import route from './router'
const that = new Vue()
export default {
    data() {
        return {
            hasLogin: false,
            webTitle: 'App',
            isAdmin: false,
            query: {
                pageSize: 5,
                pageNum: 1
            }
        }
    },
    created() {
        this.hasLogin = localStorage.getItem('token') ? true : false
    },
    methods: {
        logout() {
            that.$Modal.confirm({
                title: '提示',
                content: '<p>确认退出了吗</p>',
                onOk: () => {
                    localStorage.removeItem('token')
                    this.hasLogin = false
                    route.push({ path: '/home/'+localStorage.getItem('home_id') })
                },

            });
        }
    }
}