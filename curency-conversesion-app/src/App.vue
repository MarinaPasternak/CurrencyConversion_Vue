<template>
  <div id="app">
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
};
</script>

<style scoped lang="scss"></style>
