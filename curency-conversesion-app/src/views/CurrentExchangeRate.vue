<template>
  <div class="container">
    <div class="currency-exchange-rate">
      <h1>USD</h1>
      <div class="select-group">
        <label>Choose curency:</label>
        <select class="selecet-base-currency">
          <option
            v-for="(currency, index) in defaultCurrensies"
            :key="currency + index"
          >
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="rate-container">
        <table class="rate-table">
          <tr>
            <td>USD</td>
            <td>1</td>
          </tr>
          <tr>
            <td>UAH</td>
            <td>43</td>
          </tr>
          <tr>
            <td>UAH</td>
            <td>43</td>
          </tr>
          <tr>
            <td>UAH</td>
            <td>43</td>
          </tr>
          <tr>
            <td>UAH</td>
            <td>43</td>
          </tr>
        </table>
      </div>
      <button class="primary-button">Add currency</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultCurrensies: ["USD", "EUR", "UAH", "BTC", "ETH"],
    };
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
      color: $white-color;
    }
  }
}

.rate-table {
  margin: 2rem auto;
  border-collapse: collapse;
  font-size: 1.2rem;

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
</style>
