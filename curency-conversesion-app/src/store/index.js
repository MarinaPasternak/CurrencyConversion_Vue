import Vue from 'vue'
import Vuex from 'vuex'
import ratioCoefficient from './modules/ratio-coefficient'
import rateCurrencies from './modules/rate-currencies'
import currenciesNames from './modules/currencies'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        currenciesNames,
        rateCurrencies,
        ratioCoefficient
    }
})