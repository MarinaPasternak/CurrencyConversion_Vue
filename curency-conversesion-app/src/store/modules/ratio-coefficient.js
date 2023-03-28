export default {
    state: {
        ratioCoefficient: null,
        ratioCoefficientUSD: null,
        ratioCoefficientError: null,
        ratioCoefficientLoading: false,
    },
    mutations: {
        setRatioCoefficient(state, value) {
            state.ratioCoefficient = value;
        },
        setRatioCoefficientUSD(state, value) {
            state.ratioCoefficientUSD = value;
        },
        setRatioCoefficientLoading(state, loading) {
            state.ratioCoefficientLoading = loading;
        },
        setRatioCoefficientError(state, error) {
            state.ratioCoefficientError = error;
        }
    },
    actions: {
        async fetchRatioCoefficient({ commit }, { base, convertToCurrency }) {
            commit('setRatioCoefficientLoading', true);
            
            await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`)
            .then(response => response.json())
            .then(data => {
                commit('setRatioCoefficientLoading', false);
                commit('setRatioCoefficient', data[base][convertToCurrency]);
                commit('setRatioCoefficientUSD', data[base].usd);
            })
            .catch(error => {
                commit('setRatioCoefficientError', error.message);
                commit('setRatioCoefficientLoading', false);
            });
        } 
    },
   
}