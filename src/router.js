import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import AddPatientInfo from './views/AddPatientInfo.vue'
import CreateScale from './views/CreateScale.vue'
import MyPatients from './views/MyPatients.vue'
import MyScale from './views/MyScale.vue'
import ShowAndEditPatientInfo from './views/ShowAndEditPatientInfo.vue'
import ShowAndEditScale from './views/ShowAndEditScale.vue'
import Answer from './views/Answer.vue'
import PreviewScale from './views/PreviewScale.vue'
import AnswerScale from './views/AnswerScale.vue'
import MyAnswer from './views/MyAnswer.vue'
import AnswerSubmitSuccess from './views/AnswerSubmitSuccess.vue'
import Judge from './views/Judge.vue'
import FindPassword from './views/FindPassword.vue'
import ChangePassword from './views/ChangePassword.vue'
import NoCreate from './views/NoCreate'
import Testest from './views/Testest'
Vue.use(Router)
Vue.use(Antd)
Vue.use(VueResource);
Vue.use(ElementUI);

export default new Router({

  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/home/noCreate', name: 'noCreate', component: NoCreate },
        { path: '/home/addPatientInfo', name: 'addPatientInfo', component: AddPatientInfo },
        { path: '/home/createScale', name: 'createScale', component: CreateScale },
        { path: '/home/myPatients', name: 'myPatients', component: MyPatients },
        { path: '/home/myScale', name: 'myScale', component: MyScale },
        { path: '/home/myAnswer', name: 'myAnswer', component: MyAnswer },
        { path: '/home/test', name: 'test', component: Testest },
        { path: '/home/ShowAndEditScale', name: 'ShowAndEditScale', component: ShowAndEditScale },
        { path: '/home/showAndEditPatientInfo', name: 'showAndEditPatientInfo', component: ShowAndEditPatientInfo },
      ]
    },
    { path: '/previewScale', name: 'previewScale', component: PreviewScale },

    { path: '/home/answer', name: 'answer', component: Answer },

    { path: '/home/answerSubmitSuccess', name: 'answerSubmitSuccess', component: AnswerSubmitSuccess },

    { path: '/home/answerScale', name: 'answerScale', component: AnswerScale },

    { path: '/home/myAnswer/judge', name: 'judge', component: Judge },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/findPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ],
  mode: 'history'
})
