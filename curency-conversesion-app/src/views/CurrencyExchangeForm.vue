<template>
  <div class="container mt-3">
    <form class="currency-exchange-form">
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
            <select>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
            </select>
          </div>
        </div>
        <div class="column-container">
          <label class="mb-05">To</label>
          <div class="select-container">
            <input type="text" class="input-value" />
            <select>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
              <option>UAH</option>
            </select>
          </div>
        </div>
      </div>
      <h3 class="mt-3">1,0000 USD = 73 INR</h3>
      <button class="primary-button">Exchange</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.currency-exchange-form {
  width: 55%;
  height: 400px;
  padding: 2rem;
  background-color: $white-color;
  border-radius: 5px;

  .input-value,
  .input-amount {
    padding: 10px;
    border: 1px;
    border: 1px solid $secondary-color;
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
