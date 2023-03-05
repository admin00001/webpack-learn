<template>
  <div>app {{ a }}</div>
  <button class="btn" @click="a++">+1</button>
</template>
<script setup lang="ts">
import { add } from './util'
import { ref } from 'vue'

const a = ref(2)
</script>
<style lang="less" scoped>
.btn {
  background-color: #000;
  color: #eff;
}
</style>
