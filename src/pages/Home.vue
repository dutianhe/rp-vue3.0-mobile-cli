<template>
  <Hello></Hello>
</template>

<script setup>
import Hello from "../components/Hello.vue";
import {onMounted,inject} from "vue";

//挂载完成
onMounted( async () => {
  console.log("挂载完成")
});

//一个自执行的函数
const demoRequest = (async () => {
  //网络请求demo
  const $service = inject("$service");
  let res = await $service.request.demoRequest({
    userId:123
  })
})()


</script>

<style scoped>

</style>
