export default {
    state: {
        rateCurrencies: null,
        rateCurrenciesError: null,
        rateCurrenciesLoading: false,
    },
    mutations: {
        setRateCurrencies(state, value) {
            state.rateCurrencies = value;
        },
        setRateCurrenciesLoading(state, loading) {
            state.rateCurrenciesLoading= loading;
        },
        setRateCurrenciesError(state, error) {
            state.rateCurrenciesError = error;
        }
    },
    actions: {
        async fetchRateCurrencies({ commit }, { base, currensiesName }) {
            commit('setRateCurrenciesLoading', true);

            const currensiesNameLowerCase = currensiesName.map((item) => item.toLowerCase());
            const baseLowerCase = base.toLowerCase();
            
            await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseLowerCase}.json`)
            .then(response => response.json())
            .then(data => {
                commit('setRateCurrenciesLoading', false);

                const filteredData = Object.keys(data[baseLowerCase])
                .filter(currency => currensiesNameLowerCase.includes(currency))
                .reduce((obj, key) => {
                  obj[key] = data[baseLowerCase][key];
                  return obj;
                }, {});

                commit('setRateCurrencies', filteredData);
            })
            .catch(error => {
                commit('setRateCurrenciesError', error.message);
                commit('setRateCurrenciesLoading', false);
            });
        } 
    },
   
}