<template>
  <div class="add-currency-form-container">
    <h1>Add Curency</h1>
    <div class="search-container">
      <input type="text" class="input-value" placeholder="Start typing..." />
      <button class="primary-button">+</button>
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
export default {
  data() {
    return {
      defaultCurrencies: [],
    };
  },
  methods: {
    getCurrencyRateArray() {
      this.defaultCurrencies = JSON.parse(
        localStorage.getItem("defaultCurrencies")
      );
    },
  },
  mounted() {
    this.getCurrencyRateArray();
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

    .primary-button:hover {
      background-color: $white-color;
      color: $purple-color;
    }
  }

  .currencies-badges-container {
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
