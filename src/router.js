import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
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
import Draw from './views/Draw.vue'
import Draw1 from './views/Draw1.vue'
import AnswerScale from './views/AnswerScale.vue'
import Picture from './views/Picture.vue'
Vue.use(Router)
Vue.use(Antd)
Vue.use(VueResource);
export default new Router({

  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/home/addPatientInfo', name: 'addPatientInfo', component: AddPatientInfo },
        { path: '/home/createScale', name: 'createScale', component: CreateScale },
        { path: '/home/myPatients', name: 'myPatients', component: MyPatients },
        { path: '/home/myScale', name: 'myScale', component: MyScale },
        { path: '/home/ShowAndEditScale', name: 'ShowAndEditScale', component: ShowAndEditScale },
        { path: '/home/showAndEditPatientInfo', name: 'showAndEditPatientInfo', component: ShowAndEditPatientInfo },
      ]
    },
    { path: '/previewScale', name: 'previewScale', component: PreviewScale },
    { path: '/home/answer', name: 'answer', component: Answer },
    { path: '/home/answerScale', name: 'answerScale', component: AnswerScale },
    { path: '/home/draw', name: 'draw', component: Draw },
    { path: '/home/draw1', name: 'draw1', component: Draw1 },

    { path: '/home/picture', name: 'picture', component: Picture },
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
