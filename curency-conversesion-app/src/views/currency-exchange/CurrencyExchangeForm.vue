<template>
  <div class="container mt-3">
    <div class="currency-exchange-form">
      <h1 class="mb-2">Currency Converter</h1>
      <div class="container mb-2">
        <div class="column-container mr-3">
          <label class="mb-05">From</label>
          <div class="select-container">
            <input type="text" class="input-value" v-model="amountToConvert" />
            <select v-model="currencyBase">
              <option
                v-for="(currency, index) in defaultCurrensies"
                :key="currency + index"
              >
                {{ currency }}
              </option>
            </select>
          </div>
        </div>
        <div class="column-container">
          <label class="mb-05">To</label>
          <div class="select-container">
            <input
              type="text"
              class="input-value"
              :value="convertedAmount"
              disabled
            />
            <select v-model="currencyToConvert">
              <option
                v-for="(currency, index) in defaultCurrensies"
                :key="currency + index + '-'"
              >
                {{ currency }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <template v-if="isRatioCoefficientLoading">
        <p>Loading...</p>
      </template>
      <template v-else-if="errorMessage">
        <h4>Oops, somthing went wrong</h4>
        <p>{{ errorMessage }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultCurrensies: [
        "USD",
        "EUR",
        "UAH",
        "GBP",
        "BTC",
        "ETH",
        "BNB",
        "XRP",
      ],
      currencyBase: "USD",
      currencyToConvert: "BTC",
      amountToConvert: 0,
    };
  },
  computed: {
    ...mapState({
      ratioCoefficientForConverting: (state) =>
        state.ratioCoefficient.ratioCoefficient,
      isRatioCoefficientLoading: (state) =>
        state.ratioCoefficient.ratioCoefficientLoading,
      errorMessage: (state) => state.ratioCoefficient.ratioCoefficientError,
    }),
    convertedAmount() {
      const baseValue = this.currencyBase.toLowerCase();
      const convertToValue = this.currencyToConvert.toLowerCase();

      if (this.isFormValid > 0) {
        this.fetchRatioCoefficient({
          base: baseValue,
          convertToCurrency: convertToValue,
        });

        if (this.ratioCoefficientForConverting) {
          return (
            this.ratioCoefficientForConverting * this.amountToConvert
          ).toFixed(2);
        }
      }

      return "";
    },
    isFormValid() {
      if (this.amountToConvert > 0 && this.amountToConvert < 10000) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["fetchRatioCoefficient"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
.currency-exchange-form {
  width: 55%;
  height: auto;
  padding: 2rem;
  background-color: $white-color;
  border-radius: 5px;

  .input-value,
  .input-amount {
    padding: 10px;
    border: 1px;
    border: 1px solid $primary-color;
    border-radius: 5px;
  }

  .input-amount {
    width: 200px;
  }

  .container {
    justify-content: flex-start;
  }

  .primary-button {
    width: 100%;
  }
  .select-container {
    .input-value {
      margin-right: -10px;
    }

    select {
      padding: 9px;
      border-radius: 0.25rem;
      border: 1px solid $primary-color;
      background-color: $primary-color;
      color: $white-color;
    }
  }

  label {
    font-size: 1.2rem;
  }
}
</style>
