<template>
  <div>app {{ a }}</div>
  <img :src="imgSrc" />
  <button class="btn" @click="a++">+1</button>
</template>
<script setup lang="ts">
import imgSrc from './img/1.png';
import { ref } from 'vue'
console.log(imgSrc)

const a = ref(2)
</script>
<style lang="less" scoped>
.btn {
  background-color: #000;
  color: #eff;
}
</style>
