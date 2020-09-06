import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import IdCard from './views/IdCard.vue'

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
        { path: '/home/AnswerScale', name: 'AnswerScale', component: resolve => require(['./views/AnswerScale'], resolve) },
        { path: '/home/AnswerScaleList', name: 'AnswerScaleList', component: resolve => require(['./views/AnswerScaleList'], resolve) },
        { path: '/home/FollowUpInfo', name: 'FollowUpInfo', component: resolve => require(['./views/FollowUpInfo'], resolve) },
        { path: '/home/noCreate', name: 'noCreate', component: resolve => require(['./views/NoCreate'], resolve) },
        { path: '/home/createScale', name: 'createScale', component: resolve => require(['./views/CreateScale'], resolve) },
        { path: '/home/myPatients', name: 'myPatients', component: resolve => require(['./views/MyPatients'], resolve) },
        { path: '/home/myScale', name: 'myScale', component: resolve => require(['./views/MyScale'], resolve) },
        { path: '/home/myReport', name: 'myReport', component: resolve => require(['./views/MyReport'], resolve) },
        { path: '/home/myReport/ReportDetails', name: 'reportDetails', component: resolve => require(['./views/ReportDetails'], resolve) },

        { path: '/home/myReportAnswer', name: 'myReportAnswer', component: resolve => require(['./views/MyReportAnswer'], resolve) },
        { path: '/home/myReportAnswer/myScaleAnswer', name: 'myScaleAnswer', component: resolve => require(['./views/MyScaleAnswer'], resolve) },


        { path: '/home/ShowAndEditScale', name: 'ahowAndEditScale', component: resolve => require(['./views/ShowAndEditScale'], resolve) },
        { path: '/home/showAndEditPatientInfo', name: 'showAndEditPatientInfo', component: resolve => require(['./views/ShowAndEditPatientInfo'], resolve) },
      ]
    },
    {
      path: '/previewScale', name: 'previewScale', component: resolve => require(['./views/PreviewScale'], resolve)
    },

    {
      path: '/home/AddPatientInfo', name
        :
        'AddPatientInfo', component: resolve => require(['./views/AddPatientInfo'], resolve)
    },
    {
      path: '/home/IdCard', name
        :
        'IdCard', component: resolve => require(['./views/IdCard'], resolve)
    },
    {
      path: '/home/myReportAnswer/myScaleAnswer/answerJudge', name
        :
        'answerJudge', component: resolve => require(['./views/AnswerJudge'], resolve)
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
