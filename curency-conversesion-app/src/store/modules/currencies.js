export default {
    state: {
        currenciesNames: null,
        currenciesNameError: null,
        currenciesNameLoading: false,
    },
    mutations: {
        setCurrenciesNames(state, value) {
            state.currenciesNames = value;
        },
        setCurrenciesNamesLoading(state, loading) {
            state.currenciesNamesLoading= loading;
        },
        setCurrenciesNamesError(state, error) {
            state.currenciesNamesError = error;
        }
    },
    actions: {
        async fetchAllCurrenciesName({ commit }, alreadyAddedNames) {
            commit('setCurrenciesNamesLoading', true);
            
            await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
            .then(response => response.json())
            .then(data => {
                commit('setCurrenciesNamesLoading', false);
                
                const currenciesNames = Object.keys(data);
                const filteredCurrenciesNames = currenciesNames.filter(name => !alreadyAddedNames.includes(name));
                
                commit('setCurrenciesNames', filteredCurrenciesNames);
            })
            .catch(error => {
                commit('setCurrenciesNamesError', error.message);
                commit('setCurrenciesNamesLoading', false);
            });
        } 
    },
   
}