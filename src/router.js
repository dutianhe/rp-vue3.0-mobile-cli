import {createRouter,createWebHashHistory} from "vue-router"

const VueRouter = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            component: ()=>import("./pages/Home.vue")
        }
    ]
})
export default VueRouter;
