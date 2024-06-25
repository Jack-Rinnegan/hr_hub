
const routes=[
    {path:'/home',component:home},
    {path:'/workman',component:workman},
    {path:'/department',component:department}
]

const router= new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')