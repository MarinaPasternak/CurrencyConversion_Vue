export default {
    state: {
        currencyValue: null,
        currencyValueError: null,
        currencyValueLoading: false,
    },
    mutations: {
        setCurrencyValue(state, value) {
            state.currencyValue = value;
        },
        setCurrencyValueLoading(state, loading) {
            state.currencyValueLoading = loading;
        },
        setCurrencyValueError(state, error) {
            state.currencyValueError = error;
        }
    },
    actions: {
        async fetchCurrencyValueByBase({ commit }, { base, convertToCurrency }) {
            commit('setCurrencyValueLoading', true);
            
            await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`)
            .then(response => response.json())
            .then(data => {
                commit('setCurrencyValueLoading', false);
                commit('setCurrencyValue', data[base][convertToCurrency]);
            })
            .catch(error => {
                commit('setCurrencyValueError', error.message);
                commit('setCurrencyValueLoading', false);
            });
        } 
    },
   
}