<template>
  <div>app {{ a }} <button class="btn" @click="a++">+1</button></div>
  <img :src="imgSrc" width="300" />
</template>
<script setup lang="ts">
import imgSrc from './img/1.png';
import { ref } from 'vue'

const a = ref(2)
</script>
<style lang="less" scoped>
.btn {
  background-color: #000;
  color: #eff;
}
</style>
