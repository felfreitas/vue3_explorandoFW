<template>
  <div class="box has-text-weight-bold">
    <!-- slot serve para pegar tudo que está dentro do box, nesse caso em Tarefa -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box-Nome",
});
</script>

<style scoped>
.box {
  background-color: #faf0ca;
}
</style>
