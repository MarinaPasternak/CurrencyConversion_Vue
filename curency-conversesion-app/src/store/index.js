import Vue from 'vue'
import Vuex from 'vuex'
import currencyValue from './modules/currency-value'
import currenciesNames from './modules/currencies'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        currenciesNames,
        currencyValue
    }
})