export default {
    state: {
        ratioCoefficient: null,
        ratioCoefficientError: null,
        ratioCoefficientLoading: false,
    },
    mutations: {
        setRatioCoefficient(state, value) {
            state.ratioCoefficient = value;
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
            
            await fetch(`https://cdn.jsdeivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base}.json`)
            .then(response => response.json())
            .then(data => {
                commit('setRatioCoefficientLoading', false);
                commit('setRatioCoefficient', data[base][convertToCurrency]);
            })
            .catch(error => {
                commit('setRatioCoefficientError', error.message);
                commit('setRatioCoefficientLoading', false);
            });
        } 
    },
   
}