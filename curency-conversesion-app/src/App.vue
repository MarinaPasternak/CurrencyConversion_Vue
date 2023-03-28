<template>
  <div id="app">
    <h1>{{ greeting }}</h1>
    <p>Here's a list of currencies:</p>
    <ul>
      <li v-for="currency in currencies" :key="currency">{{ currency }}</li>
    </ul>
    <div>
      <currency-exchange-form></currency-exchange-form>
      <current-exchange-rate></current-exchange-rate>
    </div>
  </div>
</template>

<script>
import CurrencyExchangeForm from "./views/CurrencyExchangeForm.vue";
import CurrentExchangeRate from "./views/CurrentExchangeRate.vue";
export default {
  components: {
    CurrencyExchangeForm,
    CurrentExchangeRate,
  },
  data() {
    return {
      greeting: "Welcome to my currency exchange app!",
      currencies: ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"],
    };
  },
};
</script>

<style scoped lang="scss">
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
