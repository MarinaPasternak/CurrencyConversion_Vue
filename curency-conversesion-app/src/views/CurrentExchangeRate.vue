<template>
  <div class="container">
    <div class="currency-exchange-rate">
      <template v-if="errorMessage">
        <div class="validation-error-message">
          <div class="error-message-container">
            <h3>Oops, somthing went wrong</h3>
            <h4>{{ errorMessage }}</h4>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="container-header">
          <h1>{{ currencyBase }}</h1>
          <button
            class="primary-button"
            @click="updateRateList()"
            :disabled="!isItPossibleToUpdate"
          >
            Update rate
          </button>
        </div>
        <div class="select-group">
          <label>Choose curency:</label>
          <select class="selecet-base-currency" v-model="currencyBase">
            <option>usd</option>
            <option>eur</option>
            <option>uah</option>
          </select>
        </div>
        <template v-if="isRateCurrenciesLoading && !errorMessage">
          <h3>Loadinig...</h3>
        </template>
        <template v-else>
          <div class="rate-container">
            <table class="rate-table">
              <tr
                v-for="(entry, index) in Object.entries(rateCurrenciesRatios)"
                :key="entry[0] + index"
              >
                <td>{{ entry[0] }}</td>
                <td>{{ entry[1].toFixed(2) }}</td>
              </tr>
            </table>
          </div>
          <div>
            <button @click="showPopup = true" class="primary-button">
              Add currency
            </button>
            <pop-up-component v-if="showPopup" @close="showPopup = false">
              <add-new-currency-form></add-new-currency-form>
            </pop-up-component>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PopUpComponent from "../components/PopUpComponent.vue";
import AddNewCurrencyForm from "./AddNewCurrencyForm.vue";

export default {
  components: {
    AddNewCurrencyForm,
    PopUpComponent,
  },
  data() {
    return {
      defaultCurrencies: ["usd", "eur", "uah", "btc", "eth"],
      currencyBase: "usd",
      showPopup: false,
      isItPossibleToUpdate: true,
    };
  },
  computed: {
    ...mapState({
      rateCurrenciesRatios: (state) => state.rateCurrencies.rateCurrencies,
      isRateCurrenciesLoading: (state) =>
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
        this.getCurrencyRateFromLocalStorage();
      }
    },
    getCurrencyRateFromLocalStorage() {
      this.defaultCurrencies = JSON.parse(
        localStorage.getItem("defaultCurrencies")
      );
    },
    updateRateList() {
      this.getCurrencyRateFromLocalStorage();
      this.isItPossibleToUpdate = false;

      setTimeout(() => {
        this.isItPossibleToUpdate = true;
      }, 5000);
    },
  },
  mounted() {
    this.getCurrencyRateArray();

    this.fetchRateCurrencies({
      base: this.currencyBase,
      currenciesName: this.defaultCurrencies,
    });
  },
  watch: {
    currencyBase: function (newBase, oldBase) {
      this.$store.dispatch("fetchRateCurrencies", {
        base: newBase,
        currenciesName: this.defaultCurrencies,
      });
    },
    defaultCurrencies: function (newDefaultCurrencies, oldDefaultCurrencies) {
      this.$store.dispatch("fetchRateCurrencies", {
        base: this.currencyBase,
        currenciesName: newDefaultCurrencies,
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
      text-transform: uppercase;
      color: $white-color;
    }
  }
}

.rate-table {
  margin: 2rem auto;
  border-collapse: collapse;
  font-size: 1.2rem;
  text-transform: uppercase;

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

  h1 {
    text-transform: uppercase;
  }

  .primary-button {
    padding: 0.2rem;
    width: fit-content;
    height: fit-content;
    background-color: $purple-color;
    border: 3px solid $purple-color;
    font-weight: 500;
  }

  .primary-button[disabled] {
    color: $disabled-color;
    border-color: $disabled-color;
    background-color: $secondary-color;
  }

  .primary-button[disabled]:hover {
    color: $disabled-color;
    border-color: $disabled-color;
    background-color: $secondary-color;
  }

  .primary-button:hover {
    background-color: $white-color;
    color: $purple-color;
  }
}
</style>
