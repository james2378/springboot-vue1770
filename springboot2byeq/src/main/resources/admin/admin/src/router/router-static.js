import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import jiaruduiwu from '@/views/modules/jiaruduiwu/list'
    import discussziyuanwenjian from '@/views/modules/discussziyuanwenjian/list'
    import keyanduiwu from '@/views/modules/keyanduiwu/list'
    import discusskeyanchengguo from '@/views/modules/discusskeyanchengguo/list'
    import xiangmuchengguoshenbao from '@/views/modules/xiangmuchengguoshenbao/list'
    import duiwushenqing from '@/views/modules/duiwushenqing/list'
    import forum from '@/views/modules/forum/list'
    import ziyuanwenjian from '@/views/modules/ziyuanwenjian/list'
    import duiwuxinxi from '@/views/modules/duiwuxinxi/list'
    import yonghu from '@/views/modules/yonghu/list'
    import keyanchengguo from '@/views/modules/keyanchengguo/list'
    import gonggaoxinxi from '@/views/modules/gonggaoxinxi/list'
    import config from '@/views/modules/config/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/jiaruduiwu',
        name: '加入队伍',
        component: jiaruduiwu
      }
      ,{
	path: '/discussziyuanwenjian',
        name: '资源文件评论',
        component: discussziyuanwenjian
      }
      ,{
	path: '/keyanduiwu',
        name: '科研队伍',
        component: keyanduiwu
      }
      ,{
	path: '/discusskeyanchengguo',
        name: '科研成果评论',
        component: discusskeyanchengguo
      }
      ,{
	path: '/xiangmuchengguoshenbao',
        name: '项目成果申报',
        component: xiangmuchengguoshenbao
      }
      ,{
	path: '/duiwushenqing',
        name: '队伍申请',
        component: duiwushenqing
      }
      ,{
	path: '/forum',
        name: '信息交流',
        component: forum
      }
      ,{
	path: '/ziyuanwenjian',
        name: '资源文件',
        component: ziyuanwenjian
      }
      ,{
	path: '/duiwuxinxi',
        name: '队伍信息',
        component: duiwuxinxi
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/keyanchengguo',
        name: '科研成果',
        component: keyanchengguo
      }
      ,{
	path: '/gonggaoxinxi',
        name: '公告信息',
        component: gonggaoxinxi
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '系统首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
