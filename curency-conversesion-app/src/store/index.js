import Vue from 'vue'
import Vuex from 'vuex'
import ratioCoefficient from './modules/ratio-coefficient'
import currenciesNames from './modules/currencies'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        currenciesNames,
        ratioCoefficient
    }
})