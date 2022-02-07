import router from './index'
import ViewUI from 'view-design';
import Vue from 'vue'
Vue.use(ViewUI);

const LOGIN_PAGE_PATH = './'
const REGISTER_PATH_PATH = './'
router.beforeEach((to,from,next) => {
    ViewUI.LoadingBar.start();
    let token = localStorage.getItem('token')
    if(token){
        if(to.path === LOGIN_PAGE_PATH){
            //next('/admin')
        }else{
            next()
        }
    }else{
        if(to.path === LOGIN_PAGE_PATH || to.path === REGISTER_PATH_PATH){
            
            next()
        }else if(to.name === 'home' || to.name === 'detail'){      
            next()
        }else if(to.path.includes('admin')){
            next(LOGIN_PAGE_PATH)
        }else{
            next()
        }
    }
})

router.afterEach(()=>{
    ViewUI.LoadingBar.finish();
})
export default router