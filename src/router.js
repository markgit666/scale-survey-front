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
import MyReport from './views/MyReport.vue'
import ReportDetails from './views/ReportDetails.vue'
import ShowAndEditPatientInfo from './views/ShowAndEditPatientInfo.vue'
import ShowAndEditScale from './views/ShowAndEditScale.vue'
import AnswerSteps from './views/AnswerSteps.vue'
import AnswerReport from './views/AnswerReport.vue'
import IdCard from './views/IdCard.vue'
import PreviewScale from './views/PreviewScale.vue'
import MyReportAnswer from './views/MyReportAnswer.vue'
import MyScaleAnswer from './views/MyScaleAnswer.vue'

import AnswerSubmitSuccess from './views/AnswerSubmitSuccess.vue'
import Judge from './views/Judge.vue'
import AnswerJudge from './views/AnswerJudge1.vue'

import FindPassword from './views/FindPassword.vue'
import ChangePassword from './views/ChangePassword.vue'
import NoCreate from './views/NoCreate'
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
        { path: '/home/myReport', name: 'myReport', component: MyReport },
        { path: '/home/myReport/ReportDetails', name: 'ReportDetails', component: ReportDetails },

        { path: '/home/myReportAnswer', name: 'myReportAnswer', component: MyReportAnswer },
        { path: '/home/myReportAnswer/myScaleAnswer', name: 'myScaleAnswer', component: MyScaleAnswer },


        { path: '/home/ShowAndEditScale', name: 'ShowAndEditScale', component: ShowAndEditScale },
        { path: '/home/showAndEditPatientInfo', name: 'showAndEditPatientInfo', component: ShowAndEditPatientInfo },
      ]
    },
    { path: '/previewScale', name: 'PreviewScale', component: PreviewScale },

    { path: '/home/AnswerSteps', name: 'AnswerSteps', component: AnswerSteps },
    { path: '/home/AnswerReport', name: 'AnswerReport', component: AnswerReport },
    { path: '/home/IdCard', name: 'IdCard', component: IdCard },

    { path: '/home/answerSubmitSuccess', name: 'answerSubmitSuccess', component: AnswerSubmitSuccess },

    { path: '/home/myAnswer/judge', name: 'judge', component: Judge },
    { path: '/home/myReportAnswer/myScaleAnswer/answerJudge', name: 'answerJudge', component: AnswerJudge },


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
