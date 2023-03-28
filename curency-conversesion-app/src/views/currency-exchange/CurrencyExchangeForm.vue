<template>
  <div class="container mt-3">
    <div class="currency-exchange-form">
      <h1 class="mb-2">Currency Converter</h1>
      <div class="column-container mb-2">
        <label class="mb-05">Amount To Exchange</label>
        <input type="text" class="input-amount" />
      </div>
      <div class="container">
        <div class="column-container mr-3">
          <label class="mb-05">From</label>
          <div class="select-container">
            <input type="text" class="input-value" />
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
            <input type="text" class="input-value" />
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
      <h3 class="mt-3">1,0000 USD = 73 INR</h3>
      <button class="primary-button" @click="convertAmount">Exchange</button>
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
  },
  methods: {
    ...mapActions(["fetchRatioCoefficient"]),
    convertAmount() {
      const baseValue = this.currencyBase.toLowerCase();
      const convertToValue = this.currencyToConvert.toLowerCase();

      this.fetchRatioCoefficient({
        base: baseValue,
        convertToCurrency: convertToValue,
      });
      console.log(this.ratioCoefficientForConverting);
    },
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
