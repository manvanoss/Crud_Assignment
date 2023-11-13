import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeCreate from './components/pages/EmployeeCreate.vue';
import EmployeeEdit from './components/pages/EmployeeEdit.vue';
import EmployeeList from './components/pages/EmployeeList.vue';
import EmployeeShow from './components/pages/EmployeeShow.vue';
  
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: EmployeeList },
    { path: '/create', component: EmployeeCreate },
    { path: '/edit/:id', component: EmployeeEdit },
    { path: '/show/:id', component: EmployeeShow },
  ],
});
  
createApp(App).use(router).mount('#app');