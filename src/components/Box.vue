<template>
  <div class="box has-text-weight-bold" :style="estilos">
    <!-- slot serve para pegar tudo que está dentro do box, nesse caso em Tarefa -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box-Nome",
  data(){
    return{
        estilos:{
            background: '#faf0ca',
            // 'background-color': '#faf0ca',
            // backgroundColor: '#faf0ca'
        }
    }
  }
});
</script>
<!-- 
<style scoped>
.box {
  background-color: #faf0ca;
}
</style> -->
