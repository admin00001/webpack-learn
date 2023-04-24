<template>
  <div>
    <div>
      app {{ a }} <button
        class="btn"
        @click="a++"
      >
        +1
      </button>
    </div>
    <img
      :src="imgSrc"
      width="300"
    >
    <Msg msg="hello" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Msg from '@/msg.vue'
import imgSrc from './img/1.png'

const a = ref(2)
</script>
<style lang="less" scoped>
.btn {
  background-color: #000;
  color: #eff;
}
</style>
