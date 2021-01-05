import Vue from "vue"
import Vuex from "vuex"



 import {actions} from "./actions"
 import {state,getters,mutations} from "./mutations"
import cate from "./modules/cate"
import specs from "./modules/specs"
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        cate,
        specs
    }
    
})