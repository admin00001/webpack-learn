<template>
  <div class="app">
    {{ name }}
    <button class="text" @click="name++">add</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const name = ref(1)
    return {
      name
    }
  }
})
</script>
<style lang="less" scoped>
.app {
  .text{
    color: red;
  }
}
</style>
