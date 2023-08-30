<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">Descrição da tarefa</div>
      <div class="column">
        <Cronometro :tempoEmSegundos= "4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Tarefa-Nome",
  components: { Cronometro },
});
</script>

<style scoped>
.box{
    background-color: #FAF0CA;
}
</style>
