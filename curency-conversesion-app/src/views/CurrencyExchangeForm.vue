<template>
  <div class="container">
    <div class="currency-exchange-form">
      <h1>Currency Converter</h1>
      <template v-if="errorMessage">
        <h4>Oops, somthing went wrong</h4>
        <p>{{ errorMessage }}</p>
      </template>
      <template v-else>
        <div class="container">
          <div class="column-container">
            <label>From</label>
            <div class="select-container">
              <input
                type="text"
                class="input-value"
                v-model="amountToConvert"
              />
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
            <label>To</label>
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
        <h3 class="validation-error-message">{{ validationMessage }}</h3>
        <template v-if="isRatioCoefficientLoading">
          <p>Loading...</p>
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
      amountToConvert: "1.00",
      limitInUSD: 10000,
      validationMessage: "",
    };
  },
  computed: {
    ...mapState({
      ratioCoefficientForConverting: (state) =>
        state.ratioCoefficient.ratioCoefficient,
      ratioCoefficientUSD: (state) =>
        state.ratioCoefficient.ratioCoefficientUSD,
      isRatioCoefficientLoading: (state) =>
        state.ratioCoefficient.ratioCoefficientLoading,
      errorMessage: (state) => state.ratioCoefficient.ratioCoefficientError,
    }),
    convertedAmount() {
      const baseValue = this.currencyBase.toLowerCase();
      const convertToValue = this.currencyToConvert.toLowerCase();

      if (this.amountToConvert.length > 0) {
        this.fetchRatioCoefficient({
          base: baseValue,
          convertToCurrency: convertToValue,
        });

        if (
          this.ratioCoefficientForConverting &&
          this.isAmountToConvertLessThenLimit
        ) {
          this.validationMessage = "";

          return (
            this.ratioCoefficientForConverting * this.amountToConvert
          ).toFixed(2);
        } else {
          this.validationMessage = `Sorry, you have riched limit in ${this.limitInUSD} USD`;
          return "";
        }
      } else {
        this.validationMessage = "Amout to convert can't be empty";
        return "";
      }
    },
    isAmountToConvertLessThenLimit() {
      const valueonvertedUSD = this.amountToConvert * this.ratioCoefficientUSD;

      if (valueonvertedUSD <= this.limitInUSD) {
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
@import "../assets/scss/main.scss";

.currency-exchange-form {
  width: 40%;
  height: auto;
  padding: 2rem;
  background-color: $white-color;
  border-radius: 5px;

  h2 {
    margin-bottom: 2rem;
  }

  .validation-error-message {
    color: $error-color;
  }

  .input-value {
    padding: 10px;
    border: 1px;
    border: 1px solid $primary-color;
    border-radius: 5px;
  }

  .container {
    margin-bottom: 2rem;
    justify-content: space-between;

    .column-container:first-child {
      margin-right: 3rem;
    }
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
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 1250px) {
  .currency-exchange-form .container {
    flex-direction: column;

    .column-container:first-child {
      margin: 0;
      margin-bottom: 2rem;
    }
  }
}
</style>
