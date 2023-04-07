<template>
  <div class="container">
    <div class="currency-exchange-form">
      <h1>Currency Converter</h1>
      <template v-if="errorMessage">
        <div class="error-message-container">
          <h3>Oops, somthing went wrong</h3>
          <h4>{{ errorMessage }}</h4>
        </div>
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
                  v-for="(currency, index) in defaultCurrencies"
                  :key="currency + index"
                >
                  {{ currency }}
                </option>
              </select>
            </div>
          </div>
          <button
            @click="swipeCurrenciesTypes"
            type="button"
            class="change-button"
          >
            <svg
              class="svg-icon"
              style="
                width: 3em;
                height: 3em;
                vertical-align: middle;
                fill: rgb(60, 7, 145);
                overflow: hidden;
              "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M512 76.0832a428.7488 428.7488 0 0 0-248.32 78.4384l21.8112-97.5872a27.136 27.136 0 0 0-52.9408-11.8784L196.9152 204.8a27.136 27.136 0 0 0 20.48 32.3584l159.6416 35.6352a26.8288 26.8288 0 0 0 5.9392 0.6144 27.136 27.136 0 0 0 6.144-53.6576l-94.0032-20.48A375.0912 375.0912 0 0 1 512 130.2528a379.6992 379.6992 0 0 1 327.68 570.368 27.136 27.136 0 1 0 46.7968 27.3408A433.8688 433.8688 0 0 0 512 76.0832zM801.792 787.6608l-158.9248-38.2976a27.136 27.136 0 1 0-12.6976 52.736l93.5936 22.6304a371.4048 371.4048 0 0 1-218.2144 64.8192 379.6992 379.6992 0 0 1-318.3616-576.1024 27.136 27.136 0 0 0-46.3872-28.16 433.8688 433.8688 0 0 0 363.8272 658.3296H512a428.544 428.544 0 0 0 241.9712-74.24l-23.2448 97.28a27.136 27.136 0 0 0 20.48 32.6656 26.4192 26.4192 0 0 0 6.3488 0.7168 27.136 27.136 0 0 0 26.3168-20.48l38.4-158.9248a27.136 27.136 0 0 0-20.48-32.9728z"
                fill=""
              />
            </svg>
          </button>
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
                  v-for="(currency, index) in defaultCurrencies"
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
      defaultCurrencies: [
        "usd",
        "eur",
        "uah",
        "gbp",
        "btc",
        "eth",
        "bnb",
        "xpr",
      ],
      currencyBase: "usd",
      currencyToConvert: "btc",
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
      const isAmountToConvertNumeric = this.checkIfAmountToConvertNumeric(
        this.amountToConvert
      );

      if (this.amountToConvert.length > 0) {
        this.fetchRatioCoefficient({
          base: this.currencyBase,
          convertToCurrency: this.currencyToConvert,
        });

        if (isAmountToConvertNumeric) {
          if (
            this.ratioCoefficientForConverting &&
            this.isAmountToConvertLessThenLimit
          ) {
            this.validationMessage = "";
            if (
              this.currencyToConvert === "btc" ||
              this.currencyToConvert === "eth"
            ) {
              return (
                this.ratioCoefficientForConverting * this.amountToConvert
              ).toFixed(6);
            } else {
              return (
                this.ratioCoefficientForConverting * this.amountToConvert
              ).toFixed(2);
            }
          } else {
            this.validationMessage = `Sorry, you have riched limit in ${this.limitInUSD} USD`;
            return "";
          }
        } else {
          this.validationMessage = `Sorry, it's not a number`;
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
    checkIfAmountToConvertNumeric(amount) {
      return !isNaN(parseFloat(amount)) && isFinite(amount);
    },
    swipeCurrenciesTypes() {
      const tempCurrency = this.currencyBase;
      this.currencyBase = this.currencyToConvert;
      this.currencyToConvert = tempCurrency;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.currency-exchange-form {
  width: 40%;
  height: auto;
  padding: 1rem;
  background-color: $white-color;
  border-radius: 5px;

  h2 {
    margin-bottom: 2rem;
  }

  .validation-error-message {
    color: $error-color;
  }

  .change-button {
    width: 40px;
    height: 40px;
    border: none;
    background-color: $white-color;
  }

  .container {
    margin-bottom: 2rem;
    justify-content: space-between;
    align-items: self-end;
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
      text-transform: uppercase;
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
      margin-bottom: 2rem;
    }
  }
}

@media (max-width: 1250px) {
  .currency-exchange-form .container {
    flex-direction: column;
    align-items: center;

    .column-container:first-child {
      margin-bottom: 2rem;
    }
  }
}

@media (max-width: 480px) {
  .currency-exchange-form {
    width: 100%;
  }
}
</style>
