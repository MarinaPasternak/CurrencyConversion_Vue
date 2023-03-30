<template>
  <div class="container">
    <div class="currency-exchange-rate">
      <template v-if="errorMessage">
        <div class="validation-error-message">
          <h3>Oops, somthing went wrong</h3>
          <h4>{{ errorMessage }}</h4>
        </div>
      </template>
      <template v-else>
        <div class="container-header">
          <h1>{{ currencyBase }}</h1>
          <button class="primary-button">Update rate</button>
        </div>
        <div class="select-group">
          <label>Choose curency:</label>
          <select class="selecet-base-currency" v-model="currencyBase">
            <option>USD</option>
            <option>EUR</option>
            <option>UAH</option>
          </select>
        </div>
        <template v-if="israteCurrenciesLoading && !errorMessage">
          <h3>Loadinig...</h3>
        </template>
        <template v-else>
          <div class="rate-container">
            <table class="rate-table">
              <tr
                v-for="(entry, index) in Object.entries(rateCurrenciesRatios)"
                :key="entry[0] + index"
              >
                <td>{{ entry[0].toUpperCase() }}</td>
                <td>{{ entry[1].toFixed(2) }}</td>
              </tr>
            </table>
          </div>
          <button class="primary-button">Add currency</button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultCurrencies: ["USD", "EUR", "UAH", "BTC", "ETH"],
      currencyBase: "USD",
    };
  },
  computed: {
    ...mapState({
      rateCurrenciesRatios: (state) => state.rateCurrencies.rateCurrencies,
      israteCurrenciesLoading: (state) =>
        state.rateCurrencies.rateCurrenciesLoading,
      errorMessage: (state) => state.rateCurrencies.rateCurrenciesError,
    }),
  },
  methods: {
    ...mapActions(["fetchRateCurrencies"]),
    getCurrencyRateArray() {
      if (localStorage.getItem("defaultCurrencies") === null) {
        localStorage.setItem(
          "defaultCurrencies",
          JSON.stringify(this.defaultCurrencies)
        );
      } else {
        this.defaultCurrencies = JSON.parse(
          localStorage.getItem("defaultCurrencies")
        );
      }
    },
  },
  mounted() {
    this.getCurrencyRateArray();

    this.fetchRateCurrencies({
      base: this.currencyBase,
      currensiesName: this.defaultCurrencies,
    });
  },
  watch: {
    currencyBase: function (newBase, oldBase) {
      this.$store.dispatch("fetchRateCurrencies", {
        base: newBase,
        currensiesName: this.defaultCurrencies,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.currency-exchange-rate {
  width: 40%;
  height: auto;
  padding: 2rem;
  background-color: $white-color;
  border-radius: 5px;

  .validation-error-message h4 {
    color: $error-color;
  }

  .primary-button {
    width: 100%;
  }

  .select-group {
    label {
      margin-right: 1rem;
      font-size: 1.2rem;
    }
    .selecet-base-currency {
      width: 100px;
      padding: 9px;
      border-radius: 0.25rem;
      border: 1px solid $primary-color;
      background-color: $primary-color;
      text-align: center;
      color: $white-color;
    }
  }
}

.rate-table {
  margin: 2rem auto;
  border-collapse: collapse;
  font-size: 1.2rem;

  td {
    padding: 1rem;
  }

  tr:nth-child(odd) {
    background-color: $secondary-color;
  }

  tr {
    border-bottom: 2px solid $purple-color;
  }
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .primary-button {
    padding: 0.2rem;
    width: fit-content;
    height: fit-content;
    background-color: $purple-color;
    border: 3px solid $purple-color;
    font-weight: 500;
  }

  .primary-button:hover {
    background-color: $white-color;
    color: $purple-color;
  }
}
</style>
