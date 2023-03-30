<template>
  <div class="add-currency-form-container">
    <h1>Add Curency</h1>
    <div class="search-container">
      <input
        type="text"
        class="input-value"
        placeholder="Start typing..."
        list="posibleCurreciesNames"
        @keydown.enter.prevent="addNewCurrency"
        v-model="curencyToAdd"
      />
      <datalist id="posibleCurreciesNames">
        <option v-for="currencyName in currenciesNames" :key="currencyName">
          {{ currencyName }}
        </option>
      </datalist>
      <button
        class="primary-button"
        @click="addNewCurrency()"
        :disabled="!isCurencyToAddExist"
      >
        +
      </button>
      <h4 v-if="!isCurencyToAddExist">Can't find this currency</h4>
    </div>
    <div class="container currencies-badges-container">
      <div
        v-for="(currency, index) in defaultCurrencies"
        :key="index"
        class="badge"
      >
        {{ currency }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      defaultCurrencies: [],
      curencyToAdd: "",
      isCurencyToAddExist: true,
    };
  },
  computed: {
    ...mapState({
      currenciesNames: (state) => state.currenciesNames.currenciesNames,
      areCurrenciesNamesLoading: (state) =>
        state.currenciesNames.rateCurrenciesLoading,
      errorMessage: (state) => state.currenciesNames.currenciesNameError,
    }),
  },
  methods: {
    ...mapActions(["fetchAllCurrenciesName"]),
    getCurrenciesNamesArray() {
      this.defaultCurrencies = JSON.parse(
        localStorage.getItem("defaultCurrencies")
      );
    },
    setCurreciesNamesArray() {
      localStorage.setItem(
        "defaultCurrencies",
        JSON.stringify(this.defaultCurrencies)
      );
    },
    checkIfCurencyToAddExist() {
      if (
        this.currenciesNames.includes(this.curencyToAdd) ||
        this.curencyToAdd.length === 0
      ) {
        this.isCurencyToAddExist = true;
      } else {
        this.isCurencyToAddExist = false;
      }
    },
    addNewCurrency() {
      if (this.isCurencyToAddExist && this.curencyToAdd.length > 0) {
        this.defaultCurrencies.push(this.curencyToAdd);
        this.curencyToAdd = "";

        this.setCurreciesNamesArray();
        this.fetchAllCurrenciesName(this.defaultCurrencies);
      }
    },
  },
  mounted() {
    this.getCurrenciesNamesArray();
    this.fetchAllCurrenciesName(this.defaultCurrencies);
  },
  watch: {
    curencyToAdd: function (newBase, oldBase) {
      this.checkIfCurencyToAddExist();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/main.scss";

.add-currency-form-container {
  h1 {
    margin-top: 0;
  }

  .search-container {
    .primary-button {
      padding: 0.3rem;
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
      cursor: not-allowed;
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

    h4 {
      color: $error-color;
    }
  }

  .currencies-badges-container {
    flex-wrap: wrap;

    .badge {
      width: fit-content;
      margin: 0.2rem;
      padding: 0.3rem;
      font-weight: bold;
      border-radius: 5px;
      color: #fff;
      background-color: $primary-color;
    }
  }
}
</style>
