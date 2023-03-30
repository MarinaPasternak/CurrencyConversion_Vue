<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <div class="popup-header">
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="popup-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 20px;

  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
}

.popup-body {
  flex: 1;
}
</style>
