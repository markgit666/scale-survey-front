import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './views/Login.vue'
import Register from './views/Register.vue'
// import Home from './views/Home'
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
      component: resolve => require(['./views/Home'], resolve),
// component: Home,
children: [
  {path: '/home/noCreate', name: 'noCreate', component: resolve => require(['./views/NoCreate'], resolve)},
  {path: '/home/addPatientInfo', name: 'addPatientInfo', component: resolve => require(['./views/AddPatientInfo'], resolve)},
  {path: '/home/createScale', name: 'createScale', component: resolve => require(['./views/CreateScale'], resolve)},
  {path: '/home/myPatients', name: 'myPatients', component: resolve => require(['./views/MyPatients'], resolve)},
  {path: '/home/myScale', name: 'myScale', component: resolve => require(['./views/MyScale'], resolve)},
  {path: '/home/myReport', name: 'myReport', component: resolve => require(['./views/MyReport'], resolve)},
  {path: '/home/myReport/ReportDetails', name: 'reportDetails',component: resolve => require(['./views/ReportDetails'], resolve)},

  {path: '/home/myReportAnswer', name: 'myReportAnswer', component: resolve => require(['./views/MyReportAnswer'], resolve)},
  {path: '/home/myReportAnswer/myScaleAnswer', name: 'myScaleAnswer', component: resolve => require(['./views/MyScaleAnswer'], resolve)},


  {path: '/home/ShowAndEditScale', name: 'ahowAndEditScale', component: resolve => require(['./views/ShowAndEditScale'], resolve)},
  {path: '/home/showAndEditPatientInfo', name: 'showAndEditPatientInfo', component: resolve => require(['./views/ShowAndEditPatientInfo'], resolve)},
]
},
{
  path: '/previewScale', name:'previewScale', component: resolve => require(['./views/PreviewScale'], resolve)},

{
  path: '/home/AnswerSteps', name
:
  'answerSteps', component: resolve => require(['./views/AnswerSteps'], resolve)
}
,
{
  path: '/home/AnswerReport', name
:
  'answerReport', component: resolve => require(['./views/AnswerReport'], resolve)
}
,
{
  path: '/home/IdCard', name
:
  'IdCard', component: resolve => require(['./views/IdCard'], resolve)
}
,

{
  path: '/home/answerSubmitSuccess', name
:
  'answerSubmitSuccess', component: resolve => require(['./views/AnswerSubmitSuccess'], resolve)
}
,

{
  path: '/home/myAnswer/judge', name
:
  'judge', component: resolve => require(['./views/Judge'], resolve)
}
,
{
  path: '/home/myReportAnswer/myScaleAnswer/answerJudge', name
:
  'answerJudge',component: resolve => require(['./views/AnswerJudge1'], resolve)
}
,


{
  path: '/login',
    name
:
  'login',
    component: resolve => require(['./views/Login'], resolve)
}
,
{
  path: '/',
    name
:
  'login',
    component: resolve => require(['./views/Login'], resolve)
}
,
{
  path: '/register',
    name
:
  'register',
    component: resolve => require(['./views/Register'], resolve)
}
,
{
  path: '/findPassword',
    name
:
  'findPassword',
    component: resolve => require(['./views/FindPassword'], resolve)
}
,
{
  path: '/changePassword',
    name
:
  'changePassword',
    component: resolve => require(['./views/ChangePassword'], resolve)
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
