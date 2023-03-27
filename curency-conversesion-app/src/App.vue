<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      greeting: "Welcome to my currency exchange app!",
      currencies: ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"],
    };
  },
});
</script>

<template>
  <div id="app">
    <h1>{{ greeting }}</h1>
    <p>Here's a list of currencies:</p>
    <ul>
      <li v-for="currency in currencies" :key="currency">{{ currency }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
